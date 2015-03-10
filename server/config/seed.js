/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Account = require('../api/account/account.model');
var Guest = require('../api/guest/guest.model');
var Room = require('../api/room/room.model');
var Amenity = require('../api/amenity/amenity.model');
var Invoice = require('../api/invoice/invoice.model');
var Reservation = require('../api/reservation/reservation.model');
var Roomtype = require('../api/roomtype/roomtype.model');
var Accommodation = require('../api/accommodation/accommodation.model');


Account.find({}).remove(function() {
  Account.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating accounts');
    }
  );

});

Guest.find({}).remove(function(){

});

Amenity.find({}).remove(function(){
  Amenity.create(
    {
    name: 'Extra Breakfast',
    price: 120
    },
    {
      name: 'Extra Pillow',
      price: 50
    },
    {
      name: 'Extra Blanket',
      price: 50
    },
    {
      name: 'Extra Towel',
      price: 50
    },
    {
      name: 'Extra Person w/ Breakfast',
      price: 380
    }
  );
});

Room.find({}).remove(function(){
  Roomtype.find({}).remove(function(){

    var Deluxe =  new Roomtype({
      name: 'DELUXE',
      description: 'Hot and cold showers, Airconditioned , wifi, cabled tv'
      }).save( function(err, deluxe){
          if(err){
            console.log('Deluxe room failed to be seeded');
          }else{
            console.log('Success adding deluxe type, populating rooms of deluxe');
            Room.create(
              {
              number: 201,
              name: 'Single',
              description: '',
              numberOfBeds: 1,
              type: deluxe
              },
              {
                number: 202,
                name: 'Double',
                description: '',
                numberOfBeds: 1,
                type: deluxe
              },{
                number: 203,
                name: 'Single',
                description: '',
                numberOfBeds: 1,
                type: deluxe
              },
              {
                number: 204,
                name: 'Single',
                description: '',
                numberOfBeds: 1,
                type: deluxe
              },
              {
                number: 205,
                name: 'Single',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              },
              {
                number: 206,
                name: 'Single',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              },
              {
                number: 207,
                name: 'Single',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              },
              {
                number: 208,
                name: 'Twin bed',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              },
              {
                number: 209,
                name: 'Twin bed',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              },
              {
                number: 210,
                name: 'Twin bed',
                description: '',
                numberOfBeds: 2,
                type: deluxe
              })
        };

      });


    var Executive = new Roomtype({
      name: 'EXECUTIVE',
      description: '4 guests in 1 room , Hot and cold showers, Airconditioned , wifi, cabled tv'
      }).save( function(err, executive){
        if(err){
          console.log('Executive rooms failed to be seeded');
        }else{
          console.log('Success adding Executive type, populating rooms of Executive');
          Room.create(
            {
            number: 301,
            name: '1 Free breakfast!',
            description: 'Twin sized bed',
            numberOfBeds: 2,
            type: executive
            },
            {
              number: 302,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 303,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 304,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 305,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 306,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 307,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 308,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 309,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            },
            {
              number: 310,
              name: '1 Free breakfast!',
              description: 'Twin sized bed',
              numberOfBeds: 2,
              type: executive
            })
        };

      });


      var JunionExec = new Roomtype({
        name: 'JUNIOR EXECUTIVE',
        description: '2 guests in a room'
      }).save( function(err, data){
          if(err){
            console.log('JUNIOR EXECUTIVE rooms failed to be seeded');
          }else{
            console.log('Success adding JUNIOR EXECUTIVE type, populating rooms of JUNIOR EXECUTIVE');
            Room.create(
              {
                number: 401,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },
              {
                number: 402,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 403,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 404,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 405,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 406,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 407,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              },{
                number: 408,
                name: 'Doublebed',
                description: 'Doublebed',
                numberOfBeds: 1,
                type: data
              })
          };

        });


  });
});
