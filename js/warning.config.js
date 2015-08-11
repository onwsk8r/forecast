(function () {
    'use strict';

    angular
        .module('warning')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');

        $stateProvider
            .state('wwa', {
                url: '/wwa',
                templateUrl: 'partial/wfowwa.html',
                controller: 'oldwwaController'
            })
            .state('map', {
                url: '/map',
                templateUrl: 'partial/map.html',
                controller: 'mapController'
            })
            .state('forecast', {
                url: '/forecast',
                templateUrl: 'partial/forecast.html',
                controller: 'ForecastController'
            });
    }
})();
