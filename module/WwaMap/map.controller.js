(function () {
    'use strict';

    angular
        .module('wx.wwamap')
        .controller('mapController', mapController);

    mapController.$inject = ['$http', '$scope'];

    function mapController($http, $scope) {
        $scope.layers = [];
        $scope.activeLayer = null;

        $http.get('http://172.16.24.10:8080/geoserver/ndfd/ows?service=wms&version=1.3.0&request=GetCapabilities').
        then(function (response) {
            var parser = new ol.format.WMSCapabilities();
            var result = parser.read(response.data);
            pushLayers(result.Capability.Layer.Layer);
            console.log($scope.layers);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.changeLayer = function (idx) {
            var src = warning.getSource();
            var layer = $scope.layers[idx];
            $scope.activeLayer = idx;
            src.updateParams({
                'LAYERS': layer.Name
            });

            if (layer.Dimension[0].name == 'time') {
                $scope.hasTime = true;
                getTimes(layer.Dimension[0])
            } else {
                $scope.hasTime = false;
            }
        }

        var pushLayers = function (data) {
            // TODO make namespaces a thing
            angular.forEach(data, function (value) {
                this.push(value);
            }, $scope.layers);
        }

        //**** DATE STUFF ****
        $scope.hasTime = false;
        $scope.dateValue = null;
        $scope.dates = [];
        $scope.numTimes = 0;
        var getTimes = function (dateDimension) {
            $scope.dates = dateDimension.values.split(',');
            $scope.numTimes = ($scope.dates.length - 1);
            $scope.dateValue = $scope.dates.indexOf(dateDimension.default)
        }
        $scope.dateFormatter = function (idx) {
            return $scope.dates[idx];
        }
        $scope.$watch(function (scope) {
                return scope.dateValue
            },
            function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                var src = warning.getSource();
                var layer = $scope.layers[$scope.activeLayer]
                src.updateParams({
                    'time': $scope.dates[newVal]
                });
            }
        );

        //**** MAP LAYERS ****
        var srtm = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                // url: 'https://d1zy9frnzrb6ns.cloudfront.net/geoserver/wms',
                url: 'http://172.16.24.10:8080/geoserver/wms',
                params: {
                    'LAYERS': 'srtm:bw-comp',
                    'TILED': true,
                    'SRS': 'EPSG:3857',
                    format: 'image/jpeg'
                },
                serverType: 'geoserver'
            })
        });

        var warning = new ol.layer.Tile({
            opacity: 0.6,
            source: new ol.source.TileWMS({
                // url: 'https://d1zy9frnzrb6ns.cloudfront.net/geoserver/wms',
                url: 'http://172.16.24.10:8080/geoserver/wms',
                params: {
                    'TILED': true,
                    'format': "image/jpeg",
                },
                serverType: 'geoserver'
            })
        });
        var map = new ol.Map({
            layers: [srtm, warning],
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform([-100, 40], 'EPSG:4326', 'EPSG:3857'),
                zoom: 5
            })
        });
    }
})();
