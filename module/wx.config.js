(function () {
    'use strict';

    angular
        .module('wx')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/forecast/point/-94/39');

        $stateProvider
            .state('wwa', {
                url: '/wwa',
                templateUrl: 'WwaMap/wfowwa.html',
                controller: 'oldwwaController'
            })
            .state('map', {
                url: '/map',
                templateUrl: 'WwaMap/map.html',
                controller: 'mapController'
            })
            .state('forecast', {
                url: '/forecast',
                abstract: true,
                templateUrl: 'Forecast/forecast.html'
            })
            .state('forecast.point', {
                url: '/point/{lon}/{lat}',
                views: {
                    'obs': {
                        templateUrl: 'Forecast/obs.html',
                        controller: 'obsController'
                    },
                    'icons': {
                        templateUrl: 'Forecast/icons.html',
                        controller: 'iconsController'
                    },
                    'detailed': {
                        templateUrl: 'Forecast/detailed.html',
                        controller: 'detailedController'
                    }
                }
            });
    }
})();
