'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator'),
  timestamp = require('mongoose-timestamp');

require('mongo-relation');

var ReservationSchema = new Schema({
  reservedBy: { type: ObjectId, ref: 'Guest'},
  status: {type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELED']},
  rooms: [{type: ObjectId, ref: 'Room'}],
  arrival: {type: Date},
  departure: {type: Date},
  adults: Number,
  children: Number
});
ReservationSchema.plugin(timestamp);
ReservationSchema.belongsTo('Guest',{ through   : 'reservedBy' });

module.exports = mongoose.model('Reservation', ReservationSchema);
