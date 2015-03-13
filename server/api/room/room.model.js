'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var RoomSchema = new Schema({
  number:{type: Number},
  description: String,
  numberOfBeds: Number,
  image: String,
  type: {type: Number, ref: 'Roomtype', childPath: 'rooms'}
});
RoomSchema.plugin(autoIncrement.plugin, { model: 'Room', startAt: '1' , incrementBy: '1'});
RoomSchema.plugin(timestamps);
RoomSchema.plugin(relationship, { relationshipPathName : 'type'});
module.exports = mongoose.model('Room', RoomSchema);
