'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DateOnly = require('mongoose-dateonly')(mongoose),
    relationship = require('mongoose-relationship'),
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var AccommodationSchema = new Schema({
    accommodatedBy: {type: Number, ref: 'Guest', childPath: 'accommodations'},
    numberOfGuests: Number,
    arrival: {type: DateOnly},
    departure: {type: DateOnly},
    status: {type: String, enum: ['INACTIVE', 'ACTIVE']},
    room: {type: Number, ref: 'Room'},
    amenitiesAcquired: [{
      dateAcquired: {type: Date , default: Date.now },
      amenity: { type: Number, ref: 'Amenity'}
    }]
});

AccommodationSchema.plugin(timestamps);
AccommodationSchema.plugin(relationship, {relationshipPathName: 'accommodatedBy'});
AccommodationSchema.plugin(autoIncrement.plugin, { model: 'Accommodation', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Accommodation', AccommodationSchema);
