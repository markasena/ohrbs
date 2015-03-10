(function () {
    'use strict';
    angular.module('app')
      .controller('BookingFormController', BookingFormController);
      BookingFormController.$inject = ['$scope', 'Roomtype', '$timeout'];

      function BookingFormController($scope, Roomtype, $timeout){

        $scope.query = {};

        $scope.searchEnabled = false;

        Roomtype.query(function(roomtypes){
          $scope.roomtypes = roomtypes;
        });


        $scope.clearArrival = function () {
          $scope.query.arrival = null;
        };

        $scope.openArrival = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.query.arrivalOpen = true;
        };

        $scope.openDeparture = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.query.departureOpen = true;
        };

        $scope.format = 'MMMM/dd/yyyy';


      };

})();
