(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('cartAdminAddProductController', cartAdminAddProductController);

  /* @ngInject */
  function cartAdminAddProductController($scope, myConstantService, common, dataservice) {
    /* jshint validthis:true */
    let vm = this;
    vm.categories = [];
    vm.brands = [];
    vm.validationClass = common.validationClass;
    //fetch product status from constant service
    vm.catalogOnlyStatus = myConstantService.getCatalogOnlyStatus();
    vm.requiresShipping = myConstantService.getRequiresShipping();
    vm.productStatus = myConstantService.getProductStatus();
    vm.stockStatus = myConstantService.getStockStatus();
    vm.taxBand = myConstantService.getTaxBand();

    activate();
    /**
     * function called on page load
     * @returns {Promise.<Object>}
     */
    function activate() {
      var promises = [getCategories(), getBrands()];
      return common.$q.all(promises).then(function() {
        common.logger.info('Activated Add Product View');
      });
    }

    /**
     * call addProductdetails method after image upload has completed
     * @param {String} imageKey randomKey from directive callback with image random key
     * @returns {Promise.<Object>} promise object
     */
    vm.addFormDetails = function(imageKey) {
      vm.product.image = imageKey;
      return dataservice.addProduct(vm.product)
        .then(function (data) {
          common.logger.info('Product added successfully');
        });
    };

    /**
     * get categories of all the products
     * @returns {Promise.<Object>}
     */
    function getCategories() {
      return dataservice.getCategories().then(function(data) {
        vm.categories = data;
        return vm.categories;
      });
    }

    /**
     * get brands of all the products
     * @returns {Promise.<Object>}
     */
    function getBrands() {
      return dataservice.getBrands().then(function(data) {
        vm.brands = data;
        return vm.brands;
      });
    }
  }
})();
