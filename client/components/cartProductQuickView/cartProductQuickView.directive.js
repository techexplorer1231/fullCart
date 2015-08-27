(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .directive('cartProductQuickView', cartProductQuickView);

  /* @ngInject */
  function cartProductQuickView() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      templateUrl: 'components/cartProductQuickView/cartProductQuickView.html',
      controller: cartProductQuickViewController,
      restrict: 'E',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        viewProduct : '@'
      }
    };
    return directive;

    /* @ngInject */
    function cartProductQuickViewController($modal) {
      /* jshint validthis:true */
      let vm = this;
      vm.productData = angular.fromJson(vm.viewProduct);
      /**
       * called on click of quickview button
       */
      vm.quickView = function() {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'components/cartProductQuickView/cartProductQuickViewModal.html',
          controller: 'cartProductQuickViewModalInstanceController',
          controllerAs: 'vm',
          resolve: {
            product: function () {
              return vm.productData;
            }
          }
        });
      };
    }
  }
})();
