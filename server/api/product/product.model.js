'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shortid = require('shortid'),
  objectid = Schema.Types.ObjectId;

var ProductSchema = new Schema({
  brand: objectid,
  category: objectid,
  /*Choices available are 0 (No), 1 (Yes)*/
  catalog_only: Number,
  collection_group: {},
  description: {
    type: String,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    index: true,
    unique: true
  },
  /*Choices available are 0 (No), 1 (Yes)*/
  requires_shipping: Number,
  sku: {
    type: String,
    required: true,
    default: shortid.generate
  },
  slug: {
    type: String,
    required: true,
    default: shortid.generate
  },
  sale_price: {
    type: Number,
    required: true
  },
  /*Choices available are 0 (Draft), 1 (Live)*/
  status: Number,
  stock_level: {
    type: Number,
    required: true
  },
  /*Choices available are 0 (Unlimited), 1 (In Stock), 2 (Low Stock), 3 (Out Of Stock), 4 (More Stock Ordered), 5 (Discontinued)*/
  stock_status: Number,
  /*The tax band to use, choices available are 26 (None), 1 (Default)*/
  tax_band: Number,
  weight: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
