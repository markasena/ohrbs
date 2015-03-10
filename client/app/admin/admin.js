'use strict';

angular.module('app').config(function ($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController'
    }).state('manage',{
      abstract: true,
      url: '/admin/manage',
      templateUrl: 'app/admin/partials/layout.html',
      controller: 'AdminController'
    })
    .state('manage.reservations',{
      url: '/reservations',
      templateUrl: 'app/admin/partials/reservations.html',
      controller: 'ReservationsController'
    })
    .state('manage.rooms',{
      url: '/rooms',
      templateUrl: 'app/admin/partials/rooms.html'
    })
    .state('manage.amenities',{
      url: '/amenities',
      templateUrl: 'app/admin/partials/amenities.html',
      controller: 'AmenitiesController'
    })
    .state('manage.accommodations',{
      url: '/accommodations',
      templateUrl: 'app/admin/partials/accommodations.html',
      controller: 'AccommodationsController'
    })
    .state('manage.guests',{
      url: '/guests',
      templateUrl: 'app/admin/partials/guests.html',
      controller: 'GuestController'
    });
});
