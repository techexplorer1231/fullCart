'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  random_key: String,
  original_file_name: String,
  unique_file_name: String
});

module.exports = mongoose.model('Image', ImageSchema);
