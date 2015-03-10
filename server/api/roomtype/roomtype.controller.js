'use strict';

var _ = require('lodash');
var Roomtype = require('./roomtype.model');


// Get list of roomtypes
exports.index = function(req, res) {
  Roomtype.find().find(function (err, roomtype) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(roomtype);
  });
};

// Get a single roomtype
exports.show = function(req, res) {
  Roomtype.findById(req.params.id).populate('rooms')
    .exec(function (err, roomtype){
      if(err){ return handleError(res, err); }
      if(!roomtype) {return res.send(404); }
      return res.json(roomtype);
    }
  );
};

// Creates a new roomtype in the DB.
exports.create = function(req, res) {
  Roomtype.create(req.body, function(err, roomtype) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(roomtype);
  });
};

// Updates an existing roomtype in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Roomtype.findById(req.params.id, function (err, roomtype) {
    if (err) { return handleError(res, err); }
    if(!roomtype) { return res.send(404); }
    var updated = _.merge(roomtype, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(roomtype);
    });
  });
};

// Deletes a roomtype from the DB.
exports.destroy = function(req, res) {
  Roomtype.findById(req.params.id, function (err, roomtype) {
    if(err) { return handleError(res, err); }
    if(!roomtype) { return res.send(404); }
    roomtype.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
