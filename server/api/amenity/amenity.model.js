'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-autoinc');

var AmenitySchema = new Schema({
  name: String,
  price: Number,
  description: String
});


AmenitySchema.plugin(autoIncrement.plugin, { model: 'Amenity', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Amenity', AmenitySchema);
