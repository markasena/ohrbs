'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  validate = require('mongoose-validator'),
  timestamp = require('mongoose-timestamp');

require('mongo-relation')
var InvoiceSchema = new Schema({
  status: String,
  description: String,
  accommodation: {type: ObjectId, ref: 'Accommodation'},
  payment: Number
});

InvoiceSchema.plugin(timestamp, {createdAt: 'dateIssued'});
InvoiceSchema.hasOne('Accommodation', {through: 'accommodation', dependent: 'delete'});

module.exports = mongoose.model('Invoice', InvoiceSchema);
