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
    vm.addProduct = addProduct;
    //fetch product status from constant service
    vm.catalogOnlyStatus = myConstantService.getCatalogOnlyStatus();
    vm.requiresShipping = myConstantService.getRequiresShipping();
    vm.productStatus = myConstantService.getProductStatus();
    vm.stockStatus = myConstantService.getStockStatus();
    vm.taxBand = myConstantService.getTaxBand();
    //listen to broadcast event that image upload has completed.
    common.onFleUploadComplete($scope, addProductDetails);
    vm.addFormDetails = function (name) {
      alert(name);
    };

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
     * add call add brands data service with form data
     * @returns {Promise.<Object>}
     */
    function addProduct() {
      //broadcast message to start uploading images.
      common.fleUploadStart($scope, 'start file upload');
    }

    /**
     * call addProductdetails method after image upload has completed
     * @returns {Object} Promise
     */
    function addProductDetails() {
      return dataservice.addProduct(vm.product)
        .then(function (data) {
          common.logger.info('Product added successfully');
        });
    }

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
