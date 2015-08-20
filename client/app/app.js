(function () {
  'use strict';

  angular.module('fullCartApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap'

  ])
    .constant('toastr', window.toastr)
    .constant('_', window._)
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, toastr) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('authInterceptor');

      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-bottom-right';
      toastr.options.progressBar = true;
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
      return {
        // Add authorization token to headers
        request: function (config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
          if (response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    })

    .run(function ($rootScope, $location, Auth) {
      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function (loggedIn) {
          if (next.authenticate && !loggedIn) {
            event.preventDefault();
            $location.path('/login');
          }
        });
      });
    });
})();