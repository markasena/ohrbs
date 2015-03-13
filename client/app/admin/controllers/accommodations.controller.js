(function () {
    'use strict';
    angular.module('app')
      .controller('AccommodationCreateController', ['$scope','Accommodation','$rootScope', 'Guest',
        function ($scope, Accommodation, $rootScope, Guest ){

          this.errors = {};


          this.addAmenity = function(newAccommodation, modalinstace) {
            Accommodation.save(newAccommodation)
              .$promise.then(
              function(data){
                $rootScope.$broadcast('amenity:added');
                modalinstace.close();
              },function(error){
                this.errors.other = error.message;
              }
            );
          };

        }])
      .controller('AmenityUpdateController',[ function (){
        //update selected guest
        this.update = function(updatedAmenity) {
          var amenity = updatedAmenity;
          amenity.$update(function() {
          }, function(errorResponse) {
            this.error = errorResponse.data.message;
          });
        };
      }])
      .controller('AccommodationsController', [ '$scope', 'Accommodation', '$timeout', '$rootScope', '$modal', '$log',
        function($scope, Accommodation, $timeout, $rootScope, $modal, $log){

          Accommodation.query(function (accommodations) {
              $scope.accommodations = accommodations;
          });

          var updateMessageTimeout;
          var updateList = function(){
            if (updateMessageTimeout) $timeout.cancel(updateMessageTimeout);
            updateMessageTimeout = $timeout(function() {
              $scope.$apply(function() {
                Accommodation.query(function (accommodations) {
                  $scope.accommodations = accommodations;
                });
              });
            }, 500);
          };

          $scope.$on('accommodation:added', updateList);
          $scope.$on('accommodation:removed', updateList);

          $scope.createAccommodation = function(size){
            var modalInstance = $modal.open({
              templateUrl: 'app/admin/partials/modals/accommodationcreate.modal.html',
              backdrop: 'static',
              keyboard: 'false',
              controller: ['$scope','$modalInstance','guestsList', 'Accommodation', 'availableRooms',function($scope,$modalInstance, guestsList, Accommodation,availableRooms){
                $scope.accommodaiton = {};
                $scope.searchEnabled = false;
                $scope.guests = guestsList;
                $scope.rooms = availableRooms;

                $scope.ok = function(){
                  return $modalInstance;
                };
                $scope.cancel = function(){
                  $modalInstance.dismiss('cancel');
                };
              }]
              ,
              size: size,
              resolve: {
                guestsList: ['Guest',function(Guest){
                  Guest.query(function(guests){
                    console.log(guests);
                    return guests;
                  });
                }],
                availableRooms:['Room','Accommodation' , '$filter',function(Room,Accommodation, $filter){
                  Room.query(function(rooms){
                    return rooms;
                  });
                }]
              }
            });
            modalInstance.result.then(function(selectedItem){
              $scope.selected = selectedItem;
            }, function(){
              $log.info('Modal dismissed at:' + new Date());
            });
          };
      }]);
})();
