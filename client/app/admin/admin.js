'use strict';

angular.module('fullCartApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm'
      })
      .state('addBrand', {
        url: '/admin/addBrand',
        templateUrl: 'app/admin/adminAddBrand.html',
        controller: 'cartAdminAddBrandController',
        controllerAs: 'vm'
      })
      .state('addCategory', {
        url: '/admin/addCategory',
        templateUrl: 'app/admin/adminAddCategory.html',
        controller: 'cartAdminAddCategoryController',
        controllerAs: 'vm'
      })
      .state('addProduct', {
        url: '/admin/addProduct',
        templateUrl: 'app/admin/adminAddProduct.html',
        controller: 'cartAdminAddProductController',
        controllerAs: 'vm'
      });
  });
