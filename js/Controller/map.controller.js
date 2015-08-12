(function () {
    'use strict';

    angular
        .module('warning')
        .controller('mapController', mapController);

    mapController.$inject = ['$http', '$scope'];

    function mapController($http, $scope) {
        $scope.layers = [];

        $http.get('http://172.16.24.10:8080/geoserver/ndfd/ows?service=wms&version=1.3.0&request=GetCapabilities').
        then(function (response) {
            var parser = new ol.format.WMSCapabilities();
            var result = parser.read(response.data);
            $scope.pushLayers(result.Capability.Layer.Layer);
            console.log($scope.layers);
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.pushLayers = function(data) {
            // TODO make namespaces a thing
            angular.forEach(data, function (value) {
                this.push(value);
            }, $scope.layers);
        }

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
                    'LAYERS': 'ndfd:Temperature_surface',
                    'TILED': true,
                    'format': "image/jpeg"
                        //'time': '2015-08-10T12:00:00.000Z'
                },
                serverType: 'geoserver'
            })
        });
        $scope.warningMap = new ol.Map({
            layers: [srtm, warning],
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform([-100, 40], 'EPSG:4326', 'EPSG:3857'),
                zoom: 5
            })
        });
    }
})();
