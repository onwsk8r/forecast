(function () {
    'use strict';

    angular
        .module('warning')
        .controller('ForecastController', ForecastController);

    ForecastController.$inject = ['$http', '$scope'];

    function ForecastController($http, $scope) {

    }
})();
