'use strict';

var _ = require('lodash');
var Guest = require('./guest.model');


// Get list of guests
exports.index = function(req, res){
  Guest.find({})
    .populate('accommodations')
    .populate('reservations')
    .exec(function (err , guests){
      if(err){
        return handleError(res,err);
      }else{
        res.status(200).json(guests);
      }
    });
};

// Get a single guest
exports.show = function(req, res) {
  Guest.findById(req.params.id)
    .populate('accommodations')
    .populate('reservations')
    .exec(function (err, guest) {
      if(err) { return handleError(res, err); }
      if(!guest) { return res.send(404); }
      return res.json(guest);
    });
};

// Creates a new guest in the DB.
exports.create = function(req, res) {

  Guest.create(req.body, function(err, guest) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(guest);
  });

};

// Updates an existing guest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Guest.findById(req.params.id, function (err, guest) {
    if (err) { return handleError(res, err); }
    if(!guest) { return res.send(404); }
    var updated = _.merge(guest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(guest);
    });
  });
};

// Deletes a guest from the DB.
exports.destroy = function(req, res) {
  Guest.findById(req.params.id, function (err, guest) {
    if(err) { return handleError(res, err); }
    if(!guest) { return res.send(404); }
    guest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.addReservation = function(req, res , guest){
  var guestId = req.guest._id;
  Guest.findById(guestId, function (err, guest) {
    if(err) { return handleError(res, err); }
    if(!guest) { return res.send(404); }
    guest.reservations.create(req.body.reservation,function(err, guest){
      if (err) { return handleError(res, err); }
      return res.status(200).json(guest);
    });
  });
};



function handleError(res, err) {
  return res.send(500, err);
}
