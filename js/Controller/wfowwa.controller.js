(function () {
    'use strict';

    angular
        .module('warning')
        .controller('oldwwaController', oldwwaController);

    oldwwaController.$inject = ['$http', '$scope'];

    function oldwwaController($http, $scope) {
        $scope.activeWfo = 'AKQ';
        $scope.$watch(function (scope) {
            return scope.activeWfo;
        }, function (wfo) {
            var url = 'https://d1zy9frnzrb6ns.cloudfront.net/geoserver/noaa/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=noaa:cwa&outputFormat=text%2Fjavascript&propertyName=lat,lon&format_options=callback:JSON_CALLBACK;id_policy:false&cql_filter=wfo%20LIKE%20%27' + wfo + '%27';
            $http.jsonp(url).
            success(function (data, status, headers, config) {
                var props = data.features[0].properties;
                view.setCenter([props.lon, props.lat]);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        });

        $http.jsonp('https://d1zy9frnzrb6ns.cloudfront.net/geoserver/noaa/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=noaa:cwa&outputFormat=text%2Fjavascript&propertyName=city,st,wfo&format_options=callback:JSON_CALLBACK;id_policy:wfo').
        success(function (data, status, headers, config) {
            var wfos = [];
            angular.forEach(data.features, function (value, key) {
                this.push({
                    'id': value.id,
                    'city': value.properties.city,
                    'st': value.properties.st,
                });
            }, wfos);
            $scope.wfos = wfos;
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        var wfowwalayer = new ol.layer.Image({
            extent: [-160,15,-14,60],
            source: new ol.source.ImageWMS({
                url: 'https://d1zy9frnzrb6ns.cloudfront.net/geoserver/wms',
                params: {
                    'LAYERS': 'noaa:warning_wms'
                },
                serverType: 'geoserver'
            })
        });

        var view = new ol.View({
            center: [],
            zoom: 7,
            projection: 'EPSG:4326'
        });
        var map = new ol.Map({
            controls: [],
            layers: [wfowwalayer],
            target: 'wfowwamap',
            view: view
        });
    }
})();
