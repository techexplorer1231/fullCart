(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .controller('SettingsCtrl', SettingsCtrl);

  /* @ngInject */
  function SettingsCtrl(Auth, User, common) {
    /* jshint validthis:true */
    var vm = this;
    vm.errors = {};
    vm.changePassword = changePassword;
    vm.validationClass = common.validationClass;

    function changePassword(form) {
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(function () {
          vm.message = 'Password successfully changed.';
        })
        .catch(function () {
          vm.form.oldPassword.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect old password';
          vm.message = '';
        });
    }
  }
})();
