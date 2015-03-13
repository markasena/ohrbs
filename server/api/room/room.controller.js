'use strict';

var _ = require('lodash');
var Room = require('./room.model');
var Accommodation = require('../accommodation/accommodation.model');


// Get list of rooms
exports.index = function(req, res) {
  Room.find({})
    .populate('type')
    .exec(function (err, rooms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rooms);
  });
};

// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(room);
  });
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.allAvailable = function(req, res) {
  Room.find({})
    .populate('type')
    .exec(function (err, rooms) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(rooms);
    });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
};
