(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('LoginCtrl', LoginCtrl);

  /* @ngInject */
  function LoginCtrl(Auth, $location, $window, common) {
    /* jshint validthis:true */
    var vm = this;
    vm.user = {};
    vm.validationClass = common.validationClass;
    vm.login = login;

    vm.user = {};
    vm.errors = {};

    function login(form) {
      Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function () {
          // Logged in, redirect to home
          $location.path('/');
        })['catch'](function (err) {
          vm.errors.other = err.message;
        });
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
})();

