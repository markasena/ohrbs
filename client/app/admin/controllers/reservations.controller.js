(function () {
    'use strict';
    angular.module('app')
      .controller('ReservationsController', [ '$scope', 'Reservation', '$modal','$log','$timeout', '$rootScope',
        function($scope, Reservation, $modal, $log, $timeout, $rootScope){

          Reservation.query(function (reservations) {
              $scope.reservations = reservations;
          });




      }]);
})();
