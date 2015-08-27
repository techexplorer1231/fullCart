(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('cartProductQuickViewModalInstanceController', cartProductQuickViewModalInstanceController);

  /* @ngInject */
  function cartProductQuickViewModalInstanceController($modalInstance, product) {
    /* jshint validthis:true */
    let vm = this;
    vm.product = product;
    vm.ok = function () {
      $modalInstance.close();
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
