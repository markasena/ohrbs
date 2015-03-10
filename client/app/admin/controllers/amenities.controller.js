(function () {
    'use strict';
    angular.module('app')
      .controller('AmenityCreateController', ['$scope','Amenity','$rootScope',
        function ($scope, Amenity, $rootScope ){

          this.errors = {};

          this.addAmenity = function(newAmenity, modalinstace) {
            Amenity.save(newAmenity, function(guest) {
              $rootScope.$broadcast('amenity:added');
              modalinstace.close();
            }, function(errorResponse) {
              this.errors.other = errorResponse.message;
            });
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
      .controller('AmenitiesController', [ '$scope', 'Amenity', '$modal','$log','$timeout', '$rootScope',
        function($scope, Amenity, $modal, $log, $timeout, $rootScope){


          Amenity.query(function (amenities) {
              $scope.amenities = amenities;
          });

          var updateMessageTimeout;
          var updateList = function(){
            if (updateMessageTimeout) $timeout.cancel(updateMessageTimeout);
            updateMessageTimeout = $timeout(function() {
              $scope.$apply(function() {
                Amenity.query(function (amenities) {
                  $scope.amenities = amenities;
                });
              });
            }, 500);
          };

          $scope.$on('amenity:added', updateList);
          $scope.$on('amenity:removed', updateList);

          $scope.removeAmenity = function(size, selectedAmenity){
            var modalInstance = $modal.open({
              templateUrl: 'app/admin/partials/modals/amenityremove.modal.html',
              backdrop: 'static',
              keyboard: 'false',
              controller: function($scope, $modalInstance, amenity){
                $scope.amenity = amenity;

                $scope.confirm = function(){
                  $scope.amenity.$remove(function(success){
                    $rootScope.$broadcast('amenity:removed');
                    $modalInstance.close();
                  });
                };

                $scope.cancel = function(){
                  $modalInstance.close();
                };

              },
              size: size,
              resolve: {
                amenity: function(){
                  return selectedAmenity;
                }
              }
            });

            modalInstance.result.then(function(selectedItem){
              $scope.selected = selectedItem;
            }, function(){
              $log.info('Modal dismissed at:' + new Date());
            });
          };

          //open modal window to update a guest
          $scope.updateAmenity = function(size, selectedAmenity){

            var modalInstance = $modal.open({
              templateUrl: 'app/admin/partials/modals/amenityupdate.modal.html',
              backdrop: 'static',
              keyboard: 'false',
              controller:
                function($scope,$modalInstance, amenity){
                  $scope.amenity = amenity;
                  $scope.ok = function(){
                    $modalInstance.close($scope.amenity);
                  };
                  $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                  };
                }
              ,
              size: size,
              resolve:{
                amenity: function(){
                  return selectedAmenity;
                }
              }
            });

            modalInstance.result.then(function(selectedItem){
              $scope.selected = selectedItem;
            }, function(){
              $log.info('Modal dismissed at:' + new Date());
            });
          };

          $scope.createAmenity = function(size){
            var modalInstance = $modal.open({
              templateUrl: 'app/admin/partials/modals/amenitycreate.modal.html',
              backdrop: 'static',
              keyboard: 'false',
              controller: ['$scope','$modalInstance',function($scope,$modalInstance){
                $scope.amenity = {};
                $scope.ok = function(){
                  return $modalInstance;
                };
                $scope.cancel = function(){
                  $modalInstance.dismiss('cancel');
                };
              }]
              ,
              size: size
            });
            modalInstance.result.then(function(selectedItem){
              $scope.selected = selectedItem;
            }, function(){
              $log.info('Modal dismissed at:' + new Date());
            });
          };

      }]);
})();
