(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('cartAdminAddBrandController', cartAdminAddBrandController);

  /* @ngInject */
  function cartAdminAddBrandController(myConstantService, common, dataservice, exception) {
    /* jshint validthis:true */
    const vm = this;
    vm.validationClass = common.validationClass;
    vm.addBrand = addBrand;
    //fetch brand status from constant service
    vm.brandStatus = myConstantService.getBrandStatus();
    activate();
    /**
     * function called on page load
     * @returns {Promise.<Object>}
     */
    function activate() {
      common.logger.info('Activated Add Brand View');
    }
    /**
     * add call add brands data service with form data
     * @returns {Promise.<Object>}
     */
    function addBrand() {
      return dataservice.addBrand(vm.brand)
        .then(function (data) {
          common.logger.info('Brand added successfully');
        });
    }
  }
})();
