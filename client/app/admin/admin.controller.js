(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('AdminController', AdminController);

  /* @ngInject */
  function AdminController($http, Auth, User, common) {
    // Use the User $resource to fetch all users
    /* jshint validthis:true */
    const vm = this;
    vm.users = User.query();
    activate();

    function activate() {
      common.logger.info('Activated admin View');
    }

    vm.delete = function (user) {
      User.remove({
        id: user._id
      });
      angular.forEach(vm.users, function (u, i) {
        if (u === user) {
          vm.users.splice(i, 1);
        }
      });
    };
  }
})();
