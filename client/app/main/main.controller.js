'use strict';

angular.module('fullCartApp')
  .controller('MainCtrl', function (dataservice, common) {
    /* jshint validthis:true */
    let vm = this;
    vm.products = [];
    vm.quickView = quickView;
    activate();

    function activate() {
      return getProducts().then(function() {
        common.logger.info('Activated products View');
      });
    }

    function quickView(product) {

    }

    function getProducts() {
      return dataservice.getProducts().then(function(data) {
        vm.products = data;
        return vm.products;
      });
    }
  });
