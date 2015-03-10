'use strict';

var _ = require('lodash');
var Amenity = require('./amenity.model');

// Get list of amenitys
exports.index = function(req, res) {
  Amenity.find(function (err, amenitys) {
    if(err) { return handleError(res, err); }
    return res.json(200, amenitys);
  });
};

// Get a single amenity
exports.show = function(req, res) {
  Amenity.findById(req.params.id, function (err, amenity) {
    if(err) { return handleError(res, err); }
    if(!amenity) { return res.send(404); }
    return res.json(amenity);
  });
};

// Creates a new amenity in the DB.
exports.create = function(req, res) {
  Amenity.create(req.body, function(err, amenity) {
    if(err) { return handleError(res, err); }
    return res.json(201, amenity);
  });
};

// Updates an existing amenity in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Amenity.findById(req.params.id, function (err, amenity) {
    if (err) { return handleError(res, err); }
    if(!amenity) { return res.send(404); }
    var updated = _.merge(amenity, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, amenity);
    });
  });
};

// Deletes a amenity from the DB.
exports.destroy = function(req, res) {
  Amenity.findById(req.params.id, function (err, amenity) {
    if(err) { return handleError(res, err); }
    if(!amenity) { return res.send(404); }
    amenity.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}