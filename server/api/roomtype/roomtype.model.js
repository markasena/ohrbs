'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var RoomtypeSchema = new Schema({
  name: String,
  description: String,
  numberOfBeds: Number,
  rooms: [{type: Number, ref: 'Room'}]
});

RoomtypeSchema.plugin(timestamps);
RoomtypeSchema.plugin(autoIncrement.plugin, { model: 'Roomtype', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Roomtype', RoomtypeSchema);
