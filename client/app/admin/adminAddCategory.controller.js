(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('cartAdminAddCategoryController', cartAdminAddCategoryController);

  /* @ngInject */
  function cartAdminAddCategoryController(myConstantService, common, dataservice, exception) {
    /* jshint validthis:true */
    let vm = this;
    vm.validationClass = common.validationClass;
    vm.addCategory = addCategory;
    //fetch brand status from constant service
    vm.categoriesStatus = myConstantService.getCategoryStatus();
    vm.parentCategories = myConstantService.getParentCategory();
    activate();
    /**
     * function called on page load
     * @returns {Promise.<Object>}
     */
    function activate() {
      common.logger.info('Activated Add Category View');
    }
    /**
     * add call add category data service with form data
     * @returns {Promise.<Object>}
     */
    function addCategory() {
      return dataservice.addCategory(vm.category)
        .then(function (data) {
          common.logger.info('Category added successfully');
        });
    }
  }
})();
