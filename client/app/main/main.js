'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('book',{
        url: '/book',
        templateUrl: 'app/main/partials/mainReservation.html',
        controller: 'MainReservationController'
      });
  });
