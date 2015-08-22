(function () {
  'use strict';
  angular
    .module('fullCartApp')
    .factory('AdminCategory', AdminCategory);

  /* @ngInject */
  function AdminCategory($resource) {
    return $resource('api/categories/:categoryId',
      {categoryId: '@_id'},
      {update: {method: 'PUT'}}
    );
  }
})();
