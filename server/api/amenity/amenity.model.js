'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator');

require('mongo-relation');

var AmenitySchema = new Schema({
  name: String,
  price: Number,
  description: String
});

AmenitySchema.habtm('Accommodation');

module.exports = mongoose.model('Amenity', AmenitySchema);
