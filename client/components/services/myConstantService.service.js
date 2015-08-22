(function () {
  'use strict';
  angular
    .module('fullCartApp')
    .factory('myConstantService', myConstantService);

  /* @ngInject */
  function myConstantService() {
    var exports = {
      //For Category Admin
      getParentCategory: getParentCategory,
      getCategoryStatus: getCategoryStatus,
      //For brand admin
      getBrandStatus : getBrandStatus,
      //For product admin
      getCatalogOnlyStatus : getCatalogOnlyStatus,
      getRequiresShipping : getRequiresShipping,
      getProductStatus : getProductStatus,
      getStockStatus : getStockStatus,
      getTaxBand : getTaxBand,
      //For Sidebar
      getSidebarMenu: getSidebarMenu,
      getSidebarAdminMenu: getSidebarAdminMenu
    };

    return exports;

    ////////////////

    //For Category Admin
    function getParentCategory() {
      var data = ['ELECTRONICS', 'MEN', 'WOMEN', 'BABY & KIDS'];
      return data;
    }

    function getCategoryStatus() {
      var data = [{'key':0, 'value':'Draft'}, {'key':1, 'value':'Live'}];
      return data;
    }

    //For brand admin
    function getBrandStatus() {
      var data = [{'key':0, 'value':'Draft'}, {'key':1, 'value':'Live'}];
      return data;
    }

    //For product admin
    function getCatalogOnlyStatus() {
      var data = [{'key':0, 'value':'No'}, {'key':1, 'value':'Yes'}];
      return data;
    }

    function getRequiresShipping() {
      var data = [{'key':0, 'value':'No'}, {'key':1, 'value':'Yes'}];
      return data;
    }

    function getProductStatus() {
      var data = [{'key':0, 'value':'Draft'}, {'key':1, 'value':'Live'}];
      return data;
    }

    function getStockStatus() {
      var data = [
        {'key': 0, 'value': 'Unlimited'},
        {'key': 1, 'value': 'In Stock'},
        {'key': 2, 'value': 'Low Stock'},
        {'key': 3, 'value': 'Out Of Stock'},
        {'key': 4, 'value': 'More Stock Ordered'},
        {'key': 5, 'value': 'Discontinued'}
      ];
      return data;
    }

    function getTaxBand() {
      var data = [{'key':0, 'value':'None'}, {'key':1, 'value':'Default'}];
      return data;
    }

    //For Sidebar
    function getSidebarMenu() {
      var data = [
        {link:'main', title:'Home', icon:'home'},
        {link:'login', title:'Login', icon:'login'},
        {link:'signup', title:'Sign Up', icon:'perm_identity'},
        {link:'login', title:'Log Out', icon:'logout'}
      ];
      return data;
    }

    function getSidebarAdminMenu() {
      var data = [
        {link:'admin', title:'Manage Users', icon:'person_add'},
        {link:'addProduct', title:'Add Product', icon:'note_add'},
        {link:'addCategory', title:'Add Category', icon:'note_add'},
        {link:'addBrand', title:'Add Brand', icon:'note_add'}
      ];
      return data;
    }
  }
})();
