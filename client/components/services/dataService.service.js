(function() {
  'use strict';

  angular
    .module('fullCartApp')
    .factory('dataservice', dataservice);

  /* @ngInject */
  function dataservice($http, $location, $q, exception, logger) {
    var isPrimed = false;
    var primePromise;

    var service = {
      addBrand,
      addCategory,
      addProduct,
      getCategories,
      getBrands,
      getProducts,
      ready
    };

    return service;
    /**
     * admin service to add Category
     * @param {Object} formData category details
     * @returns {Promise.<Object>}
     */
    function addCategory(formData) {
      return $http.post('/api/categories', formData)
        .then(addCategoryComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for addCategory')(message);
        });

      function addCategoryComplete(data, status, headers, config) {
        return data;
      }
    }
    /**
     * admin service to add Brand
     * @param {Object} formData brand details
     * @returns {Promise.<Object>}
     */
    function addBrand(formData) {
      return $http.post('/api/brands', formData)
        .then(addBrandComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for addBrand')(message);
        });

      function addBrandComplete(data, status, headers, config) {
        return data;
      }
    }
    /**
     * admin service to add Product
     * @param {Object} formData product details
     * @returns {Promise.<Object>}
     */
    function addProduct(formData) {
      return $http.post('/api/products', formData)
        .then(addProductComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for addProduct')(message);
          throw message;
        });

      function addProductComplete(data, status, headers, config) {
        return data;
      }
    }
    /**
     * admin service to get Category
     * @param {Object} formData category details
     * @returns {Promise.<Object>}
     */
    function getCategories() {
      return $http.get('/api/categories')
        .then(getCategoryComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getCategory')(message);
        });

      function getCategoryComplete(data, status, headers, config) {
        return data.data;
      }
    }

    /**
     * admin service to get Brands
     * @param {Object} formData category details
     * @returns {Promise.<Object>}
     */
    function getBrands() {
      return $http.get('/api/brands')
        .then(getBrandComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getBrand')(message);
        });

      function getBrandComplete(data, status, headers, config) {
        return data.data;
      }
    }

    /**
     * admin service to get Brands
     * @param {Object} formData category details
     * @returns {Promise.<Object>}
     */
    function getProducts() {
      return $http.get('/api/products')
        .then(getProductComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getProducts')(message);
        });

      function getProductComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
        logger.info('Primed data');
      }
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function() { return $q.all(nextPromises); })
        .catch(exception.catcher('"ready" function failed'));
    }

  }
})();
