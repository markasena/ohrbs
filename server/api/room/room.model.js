'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator'),
  timestamp = require('mongoose-timestamp');

require('mongo-relation');

var RoomSchema = new Schema({
  number:{type: Number},
  description: String,
  numberOfBeds: Number,
  image: String,
  type: {type: ObjectId, ref: 'Roomtype'}
});

RoomSchema.belongsTo('Roomtype', {through: 'type', dependent: 'delete'});
RoomSchema.plugin(timestamp);
module.exports = mongoose.model('Room', RoomSchema);
