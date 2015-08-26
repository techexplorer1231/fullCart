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
      scope: {
        viewProduct : '@'
      }
    };
    return directive;

    /* @ngInject */
    function cartProductQuickViewController($scope, $modal) {
      $scope.productData = angular.fromJson($scope.viewProduct);
      /**
       * called on click of quickview button
       */
      $scope.quickView = function() {
        console.log($scope.productData);
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'components/cartProductQuickView/cartProductQuickViewModal.html',
          controller: 'cartProductQuickViewModalInstanceController',
          resolve: {
            product: function () {
              return $scope.productData;
            }
          }
        });
      };
    }
  }
})();
