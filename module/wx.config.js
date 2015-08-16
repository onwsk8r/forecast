(function () {
    'use strict';

    angular
        .module('wx')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');

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
                templateUrl: 'Forecast/forecast.html',
                controller: 'ForecastController'
            });
    }
})();
