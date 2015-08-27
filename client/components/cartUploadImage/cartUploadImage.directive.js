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
      $scope.addFormDetails = activate;
      let randomKey = '';
      let imageArray = [];
      //uploader constructor for upload methods and callbacks
      let uploader = $scope.uploader = new FileUploader({
        url: '/api/images',
        removeAfterUpload: 'true'
      });

      // FILTERS
      uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      /**
       * activate function called to upload images and send data back
       */
      function activate() {
        randomKey = common.generateRandomKey();
        imageArray = [];
        if (!$scope.uploader.getNotUploadedItems().length) {
          $scope.addDetails()('', []);
        } else {
          $scope.uploader.uploadAll();
        }
      }

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
        item.formData.push({
          'random_key': randomKey,
          'original_file_name': item.file.name
        });
        imageArray.push({
          'random_key': randomKey,
          'original_file_name': item.file.name,
          'unique_file_name': item.file.name.split('.', 1) + randomKey + '.' + item.file.name.split('.', 2)[1]
        })
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
        $scope.addDetails()(randomKey, imageArray);
      };

      common.logger.info('uploader', uploader);
    }
  }
})();
