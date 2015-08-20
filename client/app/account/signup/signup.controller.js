(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('SignupCtrl', SignupCtrl);

  /* @ngInject */
  function SignupCtrl(Auth, $location, $window, common) {
    /* jshint validthis:true */
    var vm = this;
    vm.user = {};
    vm.validationClass = common.validationClass;
    vm.register = register;

    function register(form) {
      Auth.createUser({
        name: vm.user.name,
        email: vm.user.email,
        password: vm.user.password
      })
        .then(function () {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch(function (err) {
          err = err.data;
          vm.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            vm.errors[field] = error.message;
          });
        });
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
})();

