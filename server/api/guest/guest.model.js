'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var GuestSchema = new Schema({
  account: {type: Number , ref:'Account'},
  firstName: {type:String, required: true},
  middleName: {type: String},
  lastName: {type: String , required: true},
  contactNumber: {type: String},
  address: {
    city: String,
    street: String,
    province: String
  },
  accommodations: [{type: Number, ref: 'Accommodation'}],
  reservations: [{type: Number, ref: 'Reservation'}]
});

GuestSchema.plugin(timestamps);
GuestSchema.plugin(autoIncrement.plugin, { model: 'Guest', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Guest', GuestSchema);
