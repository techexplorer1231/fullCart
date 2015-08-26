'use strict';

var express = require('express');
var controller = require('./image.controller');
var router = express.Router();
/*configuration for multer to upload files*/
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.original_file_name.split('.', 1) + req.body.random_key + '.' +
      req.body.original_file_name.split('.', 2)[1]);
  }
})
var upload = multer({dest: 'uploads/', storage: storage});
var cpUpload = upload.single('file');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', cpUpload, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
