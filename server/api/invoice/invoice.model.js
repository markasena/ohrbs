'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DateOnly = require('mongoose-dateonly')(mongoose),
    autoIncrement = require('mongoose-autoinc'),
    timestamps = require('mongoose-timestamp');

var InvoiceSchema = new Schema({
  status: String,
  description: String,
  accommodation: {type: Number, ref: 'Accommodation'},
  payment: Number
});

InvoiceSchema.plugin(timestamps, {createdAt: 'dateIssued'});
InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', startAt: '1' , incrementBy: '1'});
module.exports = mongoose.model('Invoice', InvoiceSchema);
