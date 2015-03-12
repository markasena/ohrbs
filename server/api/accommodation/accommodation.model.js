'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator'),
  timestamp = require('mongoose-timestamp');

require('mongo-relation');
var AccommodationSchema = new Schema({
  accommodatedBy: {type: ObjectId, ref: 'Guest'},
  numberOfGuests: Number,
  arrival: {type: Date},
  departure: {type: Date},
  status: {type: String, enum: ['INACTIVE', 'ACTIVE']},
  room: {type: ObjectId, ref: 'Room'},
  amenitiesAcquired: [{ type: ObjectId, ref: 'Amenity'}]
});
AccommodationSchema.belongsTo('Guest', { through:'accommodatedBy' });
AccommodationSchema.habtm('Amenity', { through: 'amenitiesAcquired'});
AccommodationSchema.plugin(timestamp);
module.exports = mongoose.model('Accommodation', AccommodationSchema);
