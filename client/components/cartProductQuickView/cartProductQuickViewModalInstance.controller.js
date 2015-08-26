(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('cartProductQuickViewModalInstanceController', cartProductQuickViewModalInstanceController);

  /* @ngInject */
  function cartProductQuickViewModalInstanceController($scope, $modalInstance, product) {
    $scope.product = product;
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
