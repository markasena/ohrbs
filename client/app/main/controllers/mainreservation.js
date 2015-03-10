(function () {
    'use strict';
    angular
        .module('app')
          .controller('MainReservationController', ['$scope' , 'Roomtype', 'Reservation', '$rootScope', '$location', '$http', 'Auth', 'Guest', 'User',
        function ($scope , Roomtype, Reservation, $rootScope, $location, $http, Auth, Guest, User) {

          $scope.guest = {};
          $scope.guest.address = {};
          $scope.account = {};
          $scope.errors = {};

          if($rootScope.bookDetails == null){
            $location.path('/');
          }else{
            $scope.bookDetails = $rootScope.bookDetails;

            var reservation = new Reservation({
              status: 'PENDING',
              arrival: $scope.bookDetails.arrival,
              departure: $scope.bookDetails.departure,
              adults:  $scope.bookDetails.adults,
              children: $scope.bookDetails.children
            });

            $scope.reservation = reservation;

            $http.post('/api/reservation/getavailablerooms',
              {   arrival:  $scope.bookDetails.arrival,
                departure:  $scope.bookDetails.departure,
                adults:  $scope.bookDetails.adults,
                children:  $scope.bookDetails.children,
                type:  $scope.bookDetails.roomtype
              })
              .success(function(data){
                $scope.availableRooms = data;
                console.log(data);
              }).error(function(data){

              });
            }


          $scope.selectRoom = function(room){
            angular.forEach($scope.availableRooms, function(room) {
              room.selected = false;
            });
            $scope.room = room;
            $scope.room.selected = true;
            $scope.reservation.room = room._id;
          };

          $scope.register = function(form) {
            $scope.submitted = true;
            if(form.$valid) {
              Guest.save($scope.guest, function(data){
                $scope.account.owner = data._id;
                User.save($scope.account,function(account){
                  $scope.reservation.reservedBy = data._id;
                  $scope.reservation.$save(function(success){
                    $scope.steps.step3=true;
                    console.log(success);
                  })
                })
              });
            }
          };




      }]);


})();
