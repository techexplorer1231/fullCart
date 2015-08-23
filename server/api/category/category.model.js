'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('node-uuid'),
  objectid = Schema.Types.ObjectId;

var CategorySchema = new Schema({
  created_at: {
    type: Date
  },
  description: {
    type: String,
    required: true
  },
  parent: String,
  /*A unique identifier generally used as part of a URL.*/
  slug: {
    type: String,
    required: true,
    default: uuid.v1()
  },
  /*Choices available are 0 (Draft), 1 (Live).*/
  status: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    index: true,
    unique: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Category', CategorySchema);
