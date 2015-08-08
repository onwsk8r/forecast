(function () {
    'use strict';

    angular
        .module('warning')
        .controller('forecastController', forecastController);

    forecastController.$inject = ['$http', '$scope'];

    function forecastController($http, $scope) {

    }
})();
