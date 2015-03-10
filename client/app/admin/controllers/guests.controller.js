(function () {

  'use strict';

  angular.module('app')
    .controller('GuestCreateController', ['$scope','Guest','$rootScope',
      function ($scope, Guest, $rootScope ){

        this.errors = {};


        this.createGuest = function(newGuest, modalinstace) {
          Guest.save(newGuest, function(guest) {
            $rootScope.$broadcast('guest:added');
            modalinstace.close();
          }, function(errorResponse) {
              this.errors.other = errorResponse.message;
          });
        };

      }])
    .controller('GuestUpdateController',[ function ($scope, Guest){
        //update selected guest
        this.update = function(updatedGuest) {
          var guest = updatedGuest;
          guest.$update(function() {
          }, function(errorResponse) {
            this.error = errorResponse.data.message;
          });
        };
    }])
    .controller('GuestController', ['$scope','Guest','$modal','$log','$timeout', '$rootScope',
      function ($scope, Guest, $modal, $log, $timeout, $rootScope){


      Guest.query(function(guests){
        $scope.guests = guests;
      });

      var updateMessageTimeout;
      var updateGuest = function(){
        if (updateMessageTimeout) $timeout.cancel(updateMessageTimeout);
        updateMessageTimeout = $timeout(function() {
          $scope.$apply(function() {
            Guest.query(function(guests) {
              $scope.guests = guests;
            });
          });
        }, 500);
      };

      $scope.$on('guest:added', updateGuest);
      $scope.$on('guest:removed', updateGuest);


      $scope.removeGuest = function(size, selectedGuest){
        var modalInstance = $modal.open({
          templateUrl: 'app/admin/partials/modals/guestremove.modal.html',
          backdrop: 'static',
          keyboard: 'false',
          controller: ['$scope','$modalInstance','guest',function($scope, $modalInstance, guest){
            $scope.guest = guest;
            $scope.confirm = function(){
              $scope.guest.$remove(function(success){
                $rootScope.$broadcast('guest:removed');
                $modalInstance.close();
              });
            };
            $scope.cancel = function(){
              $modalInstance.close();
            }

          }],
          size: size,
          resolve: {
            guest: function(){
              return selectedGuest;
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
      $scope.modalUpdate = function(size, selectedGuest){

        var modalInstance = $modal.open({
          templateUrl: 'app/admin/partials/modals/guestupdate.modal.html',
          backdrop: 'static',
          keyboard: 'false',
          controller:
            function($scope,$modalInstance, guest){
              $scope.guest = guest;

              $scope.ok = function(){
                $modalInstance.close($scope.guest);
              };

              $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
              };

            }
          ,
          size: size,
          resolve:{
            guest: function(){
              return selectedGuest;
            }
          }
        });

        modalInstance.result.then(function(selectedItem){
          $scope.selected = selectedItem;
        }, function(){
          $log.info('Modal dismissed at:' + new Date());
        });
      };

      $scope.createGuest = function(size){
        var modalInstance = $modal.open({
          templateUrl: 'app/admin/partials/modals/guestcreate.modal.html',
          backdrop: 'static',
          keyboard: 'false',
          controller: ['$scope','$modalInstance',function($scope,$modalInstance){
            $scope.guest = {};
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
