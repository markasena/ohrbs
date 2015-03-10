'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, Roomtype, $rootScope) {

    $rootScope.bookDetails = {};

    $scope.searchEnabled = false;

    Roomtype.query(function(roomtypes){
      $scope.roomtypes = roomtypes;
    });


    $scope.clearArrival = function () {
      $scope.bookDetails.arrival = null;
    };

    $scope.openArrival = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.bookDetails.arrivalOpen = true;
    };

    $scope.openDeparture = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.bookDetails.departureOpen = true;
    };

  });
