'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DateOnly = require('mongoose-dateonly')(mongoose),
    relationship = require("mongoose-relationship"),
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var ReservationSchema = new Schema({
    reservedBy: { type: Number, ref: 'Guest', childPath: 'reservations'},
    status: {type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELED']},
    room: {type: Number, ref: 'Room'},
    arrival: {type: DateOnly},
    departure: {type: DateOnly},
    adults: Number,
    children: Number
});
ReservationSchema.plugin(timestamps);
ReservationSchema.plugin(autoIncrement.plugin, { model: 'Reservation', startAt: '1' , incrementBy: '1'});
ReservationSchema.plugin(relationship, {relationshipPathName: 'reservedBy'});
module.exports = mongoose.model('Reservation', ReservationSchema);
