(function () {
    'use strict';

    angular
        .module('warning')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/forecast');

        $stateProvider
            .state('wwa', {
                url: '/wwa',
                templateUrl: 'partial/wfowwa.html',
                controller: 'oldwwaController'
            })
            .state('prettywwa', {
                url: '/prettywwa',
                templateUrl: 'partial/prettywwa.html',
                controller: 'prettywwaController'
            })
            .state('forecast', {
                url: '/forecast',
                templateUrl: 'partial/forecast.html',
                controller: 'ForecastController'
            });
    }
})();
