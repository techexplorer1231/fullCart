'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var mime = require('mime');

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

// Create a single image
exports.create = function(req, res) {
  return res.status(201).end();
  /*var body = req.body;
  body.unique_file_name = req.body.original_file_name.split('.', 1) + req.body.random_key + '.' +
                          req.body.original_file_name.split('.', 2)[1];
  Image.create(body, function(err, image) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(image);
  });*/
}

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
