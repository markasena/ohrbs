'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  timestamp = require('mongoose-timestamp');

require('mongo-relation');

var RoomtypeSchema = new Schema({
  name: String,
  description: String,
  numberOfBeds: Number,
  rooms: [{type: ObjectId, ref: 'Room'}]
});

RoomtypeSchema.hasMany('Room', { through: 'rooms', dependent: 'nullify' });
RoomtypeSchema.plugin(timestamp);
module.exports = mongoose.model('Roomtype', RoomtypeSchema);
