/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict'

var Guest = require('../api/guest/guest.model');
var Account = require('../api/account/account.model');
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

  Guest.create({
    name: [
      {
        frst: 'Hayley',
        mddle: '',
        lst: ''
      }
    ],
    contactNumber: '',
    address: {
      city: '',
      street: ''
    }
    }, function(err, guest) {

    var today = new Date(Date.now());

    guest.reservations.create({
      status: 'PENDING',
      rooms: [],
      arrival: today,
      departure: new Date(Date.now()).setHours( today.getHours() + 48).getDate(),
      adults: 2,
      children: 0
    },function(err, guest){

    });
  });


});
//
Reservation.find({}).remove(function(){

});

Accommodation.find({}).remove(function(){

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
    });
    Deluxe.rooms.create([
        {
          number: 201,
          name: 'Single',
          description: '',
          numberOfBeds: 1
        },
        {
          number: 202,
          name: 'Double',
          description: '',
          numberOfBeds: 1
        },{
          number: 203,
          name: 'Single',
          description: '',
          numberOfBeds: 1
        },
        {
          number: 204,
          name: 'Single',
          description: '',
          numberOfBeds: 1
        },
        {
          number: 205,
          name: 'Single',
          description: '',
          numberOfBeds: 2
        },
        {
          number: 206,
          name: 'Single',
          description: '',
          numberOfBeds: 2
        },
        {
          number: 207,
          name: 'Single',
          description: '',
          numberOfBeds: 2
        },
        {
          number: 208,
          name: 'Twin bed',
          description: '',
          numberOfBeds: 2
        },
        {
          number: 209,
          name: 'Twin bed',
          description: '',
          numberOfBeds: 2
        },
        {
          number: 210,
          name: 'Twin bed',
          description: '',
          numberOfBeds: 2
        }], function(err){

      }
    );

    var Executive = new Roomtype({
      name: 'EXECUTIVE',
      description: '4 guests in 1 room , Hot and cold showers, Airconditioned , wifi, cabled tv'
    });

    Executive.rooms.create([

      {
        number: 301,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 302,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 303,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 304,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 305,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 306,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 307,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 308,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 309,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      },
      {
        number: 310,
        name: '1 Free breakfast!',
        description: 'Twin sized bed',
        numberOfBeds: 2
      }
    ], function(err){

    });


  var JuniorExec = new Roomtype({
    name: 'JUNIOR EXECUTIVE',
    description: '2 guests in a room'
  });

  JuniorExec.rooms.create([
    {
      number: 401,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },
    {
      number: 402,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 403,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 404,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 405,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 406,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 407,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    },{
      number: 408,
      name: 'Doublebed',
      description: 'Doublebed',
      numberOfBeds: 1
    }], function(err){

  });

  });
});





