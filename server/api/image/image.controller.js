'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var multer = require('multer');

// Get list of images
exports.index = function(req, res) {
  Image.find(function (err, images) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).send('Not Found'); }
    return res.json(image);
  });
};

function cpUpload(req, res, next) {
  console.log('here');
  multer({dest: 'uploads/'})
  next();
}

// Creates a new image in the DB.
exports.create = [cpUpload , function(req, res) {
  console.log('there');
  res.status(204).end()
}]

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).send('Not Found'); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if (!image) { return res.status(404).send('Not Found'); }
    image.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}