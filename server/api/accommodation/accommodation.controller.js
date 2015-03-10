'use strict';

var _ = require('lodash');
var Accommodation = require('./accommodation.model');

// Get list of accomodations
exports.index = function(req, res) {
  Accommodation.find(function (err, accomodations) {
    if(err) { return handleError(res, err); }
    return res.json(200, accomodations);
  });
};

// Get a single accomodation
exports.show = function(req, res) {
  Accommodation.findById(req.params.id, function (err, accomodation) {
    if(err) { return handleError(res, err); }
    if(!accomodation) { return res.send(404); }
    return res.json(accomodation);
  });
};

// Creates a new accomodation in the DB.
exports.create = function(req, res) {
  Accommodation.create(req.body, function(err, accomodation) {
    if(err) { return handleError(res, err); }
    return res.json(201, accomodation);
  });
};

// Updates an existing accomodation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Accommodation.findById(req.params.id, function (err, accomodation) {
    if (err) { return handleError(res, err); }
    if(!accomodation) { return res.send(404); }
    var updated = _.merge(accomodation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, accomodation);
    });
  });
};

// Deletes a accomodation from the DB.
exports.destroy = function(req, res) {
  Accommodation.findById(req.params.id, function (err, accomodation) {
    if(err) { return handleError(res, err); }
    if(!accomodation) { return res.send(404); }
    accomodation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
