(function () {
    'use strict';

    angular
        .module('warning')
        .controller('mapController', mapController);

    prettywwaController.$inject = ['$http', '$scope'];

    function mapController($http, $scope) {
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
            opacity: 0.8,
            source: new ol.source.TileWMS({
               // url: 'https://d1zy9frnzrb6ns.cloudfront.net/geoserver/wms',
                url: 'http://172.16.24.10:8080/geoserver/wms',
                params: {
                    'LAYERS': 'noaa:Temperature_surface',
                    'TILED': true,
                    'time': '2015-08-10T12:00:00.000Z'
                },
                serverType: 'geoserver'
            })
        });

        var map = new ol.Map({
            layers: [srtm, warning],
            target: 'bigmap',
            view: new ol.View({
                center: ol.proj.transform([-100, 40], 'EPSG:4326', 'EPSG:3857'),
                zoom: 5
            })
        });

    }
})();
