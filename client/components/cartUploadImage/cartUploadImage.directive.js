(function () {
  'use strict';

  angular
    .module('fullCartApp')
    .directive('cartUploadImage', cartUploadImage);

  /* @ngInject */
  function cartUploadImage() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      templateUrl: 'components/cartUploadImage/cartUploadImage.html',
      controller: fileUploadController,
      restrict: 'E',
      scope: {
        addDetails: '&'
      }
    };
    return directive;

    /* @ngInject */
    function fileUploadController($scope, FileUploader, common) {
      let randomKey = common.generateRandomKey();
      $scope.addFormDetails = function() {
        var name = 'New Customer Added by Directive';
        $scope.addDetails()(name);
      }
      let uploader = $scope.uploader = new FileUploader({
        url: '/api/images',
        removeAfterUpload: 'true'
      });

      common.onFleUploadStart($scope, function (data) {
        if (!uploader.getNotUploadedItems().length) {
          common.fleUploadComplete($scope, 'no files to upload');
        } else {
          $scope.uploader.uploadAll();
        }
      });

      // FILTERS
      uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      // CALLBACKS
      /** Method called to append form data*/
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
        console.log(item);
        item.formData.push({
          'random_key': randomKey,
          'original_file_name': item.file.name
        });
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
        common.fleUploadComplete($scope, 'completed file upload');
        uploader = new FileUploader({
          url: '/api/images',
          removeAfterUpload: 'true'
        });
      };

      common.logger.info('uploader', uploader);
    }
  }
})();
