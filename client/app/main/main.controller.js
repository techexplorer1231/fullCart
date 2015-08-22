'use strict';

angular.module('fullCartApp')
  .controller('MainCtrl', function (dataservice, common) {
    /* jshint validthis:true */
    const vm = this;
    vm.products = [];
    activate();

    function activate() {
      return getProducts().then(function() {
        common.logger.info('Activated products View');
      });
    }

    function getProducts() {
      return dataservice.getProducts().then(function(data) {
        vm.products = data;
        return vm.products;
      });
    }
  });
