(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .factory('common', common);

  /* @ngInject */
  function common($location, $q, $rootScope, $timeout, logger, _, uuid) {
    var throttles = {};

    var service = {
      // common angular dependencies
      $broadcast,
      $q,
      $timeout,
      _,
      // generic
      createSearchThrottle,
      debouncedThrottle,
      isNumber,
      logger,
      // for accessibility
      replaceLocationUrlGuidWithId,
      textContains,
      validationClass,
      generateRandomKey
    };

    return service;
    //////////////////////

    function $broadcast() {
      return $rootScope.$broadcast.apply($rootScope, arguments);
    }

    function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
      // After a delay, search a viewmodel's list using
      // a filter function, and return a filteredList.

      // custom delay or use default
      delay = +delay || 300;
      // if only vm and list parameters were passed, set others by naming convention
      if (!filteredList) {
        // assuming list is named sessions, filteredList is filteredSessions
        filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
        // filter function is named sessionFilter
        filter = list + 'Filter'; // function in string form
      }

      // create the filtering function we will call from here
      var filterFn = function () {
        // translates to ...
        // vm.filteredSessions
        //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
        viewmodel[filteredList] = viewmodel[list].filter(function (item) {
          return viewmodel[filter](item);
        });
      };

      return (function () {
        // Wrapped in outer IIFE so we can use closure
        // over filterInputTimeout which references the timeout
        var filterInputTimeout;

        // return what becomes the 'applyFilter' function in the controller
        return function (searchNow) {
          if (filterInputTimeout) {
            $timeout.cancel(filterInputTimeout);
            filterInputTimeout = null;
          }
          if (searchNow || !delay) {
            filterFn();
          } else {
            filterInputTimeout = $timeout(filterFn, delay);
          }
        };
      })();
    }

    function debouncedThrottle(key, callback, delay, immediate) {
      // Perform some action (callback) after a delay.
      // Track the callback by key, so if the same callback
      // is issued again, restart the delay.

      var defaultDelay = 1000;
      delay = delay || defaultDelay;
      if (throttles[key]) {
        $timeout.cancel(throttles[key]);
        throttles[key] = undefined;
      }
      if (immediate) {
        callback();
      } else {
        throttles[key] = $timeout(callback, delay);
      }
    }

    function isNumber(val) {
      // negative or positive
      return (/^[-]?\d+$/).test(val);
    }

    function replaceLocationUrlGuidWithId(id) {
      // If the current Url is a Guid, then we replace
      // it with the passed in id. Otherwise, we exit.
      var currentPath = $location.path();
      var slashPos = currentPath.lastIndexOf('/', currentPath.length - 2);
      var currentParameter = currentPath.substring(slashPos - 1);

      if (isNumber(currentParameter)) {
        return;
      }

      var newPath = currentPath.substring(0, slashPos + 1) + id;
      $location.path(newPath);
    }

    function textContains(text, searchText) {
      return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
    }

    /**
     * checks if the field is valid or not
     * @param {object} value get form.field.$error
     * @returns {String} return if form field valid valid or not
     */
    function validationClass(value) {
      if (_.isEmpty(value)) {
        return 'has-success';
      }else {
        return 'has-error';
      }
    }

    /**
     * generates a random key using node-uuid generator
     * @returns {String}
     */
    function generateRandomKey(){
      return uuid.v4();
    }

  }
})();
