(function () {
    'use strict';

    angular
        .module('wx.forecast')
        .controller('detailedController', detailedController);

    detailedController.$inject = ['$http', '$scope'];

    function detailedController($http, $scope) {
    };
})();
