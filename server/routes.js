/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var restify = require('express-restify-mongoose');
var express = require('express');
var router = express.Router();
module.exports = function(app) {



  // Insert routes below
  app.use('/api/accounts', require('./api/account'));
  //app.use('/api/guests', require('./api/guest'));
  //app.use('/api/rooms', require('./api/room'));
  //app.use('/api/roomtype', require('./api/roomtype'));
  //app.use('/api/accommodation', require('./api/accommodation'));
  //app.use('/api/reservation', require('./api/reservation'));
  //app.use('/api/invoice', require('./api/invoice'));
  //app.use('/api/amenities', require('./api/amenity'));


  app.use('/auth', require('./auth'));

  var options = {
    prefix: '/api',
    version: '',
    private: false,
    lean: true,
    plural: true,
    middleware: [],
    strict: false,
    findOneAndUpdate: true,
    findOneAndRemove: true,
    contextFilter: null,
    postCreate: null
  };


  restify.serve(router, require('./api/guest/guest.model'), options);
  restify.serve(router, require('./api/accommodation/accommodation.model'), options);
  restify.serve(router, require('./api/reservation/reservation.model'), options);
  restify.serve(router, require('./api/amenity/amenity.model'), options);
  restify.serve(router, require('./api/invoice/invoice.model'), options);
  restify.serve(router, require('./api/room/room.model'), options);
  restify.serve(router, require('./api/roomtype/roomtype.model'), options);



  app.use(router);



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res, next) {
      res.sendFile('index.html', {root: app.get('appPath')} , function(err){
        if(err){
          console.log(err);
        }
      });
    });
};
