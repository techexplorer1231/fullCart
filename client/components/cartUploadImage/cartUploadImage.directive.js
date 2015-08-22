(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .directive('cartUploadImage', cartUploadImage);

  /* @ngInject */
  function cartUploadImage(FileUploader) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      templateUrl: 'components/cartUploadImage/cartUploadImage.html',
      controller: fileUploadController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: true
    };
    return directive;

    /* @ngInject */
    function fileUploadController(FileUploader, common) {
      /* jshint validthis:true */
      const vm = this;
      var uploader = vm.uploader = new FileUploader({
        url: '/api/images'
      });

      // FILTERS

      uploader.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
          return this.queue.length < 10;
        }
      });
      uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      // CALLBACKS

      uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        common.logger.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function (fileItem) {
        common.logger.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function (addedFileItems) {
        common.logger.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function (item) {
        common.logger.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function (fileItem, progress) {
        common.logger.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function (progress) {
        common.logger.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function (fileItem, response, status, headers) {
        common.logger.info('onSuccessItem', fileItem, response, status, headers);
      };
      uploader.onErrorItem = function (fileItem, response, status, headers) {
        common.logger.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function (fileItem, response, status, headers) {
        common.logger.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function (fileItem, response, status, headers) {
        common.logger.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function () {
        common.logger.info('onCompleteAll');
      };

      common.logger.info('uploader', uploader);
    }
  }
})();
