'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator'),
  timestamp = require('mongoose-timestamp');

require('mongo-relation');

var GuestSchema = new Schema({
  account: { type: ObjectId, ref: 'Account' },
  name: [
    {
      frst:{type: String},
      mddle: {type: String},
      lst: {type: String}
    }
  ],
  contactNumber: {type: String},
  address: {
    city: String,
    street: String
  },
  accommodations: [{type: ObjectId, ref: 'Accommodation'}],
  reservations: [{type: ObjectId, ref: 'Reservation'}]
});

GuestSchema
  .virtual('fullname')
  .get(function() {
    return this.name.lst + ' , ' + this.name.frst + ' ' + this.name.mddle;
  });

GuestSchema
  .virtual('fulladdress')
  .get(function() {
    return this.address.street + ' , ' + this.address.city;
  });

GuestSchema
  .virtual('checkedin')
  .get(function() {
    var bol = true;

    return bol;
  });

GuestSchema.hasMany('Accommodation', {through: 'accommodations', dependent: 'delete'});
GuestSchema.hasMany('Reservation', {through: 'reservations', dependent: 'delete'});
GuestSchema.plugin(timestamp);
module.exports = mongoose.model('Guest', GuestSchema);
