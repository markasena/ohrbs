(function () {
    'use strict';
  angular.module('app')
    .controller('RoomController', ['$scope', 'Room', 'Roomtype', '$modal', '$log', '$timeout', '$rootScope'
      ,function($scope,  Room, Roomtype, $modal, $log, $timeout, $rootScope){
        //asign scope to vm(viewmodel) variable
        var vm = this;


        //get all customers
        Room.query(function(rooms){
          vm.rooms = rooms;
        });

        Roomtype.query(function(types){
          vm.roomtypes = types;
        });

        var updateMessageTimeout;
        var updateRooms = function(){
          if (updateMessageTimeout) $timeout.cancel(updateMessageTimeout);
          updateMessageTimeout = $timeout(function() {
            $scope.$apply(function() {
              Room.query(function(rooms) {
                vm.rooms = rooms;
              });
            });
          }, 500);
        };

        var updateRoomtypes = function(){
          if (updateMessageTimeout) $timeout.cancel(updateMessageTimeout);
          updateMessageTimeout = $timeout(function() {
            $scope.$apply(function() {
              Roomtype.query(function(types) {
                vm.roomtypes = types;
              });
            });
          }, 500);
        };

        $scope.$on('roomtype:added', updateRoomtypes);
        $scope.$on('roomtype:removed', updateRoomtypes);

        $scope.$on('room:added', updateRooms);
        $scope.$on('room:removed', updateRooms);

        vm.removeRoomtype = function(size, selectedRoomtype){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomtyperemove.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope, $modalInstance, roomtype){

              $scope.confirm = function(){
                roomtype.$remove(function(success){
                  $rootScope.$broadcast('roomtype:removed');
                  $modalInstance.close();
                });
              };

              $scope.cancel = function(){
                $modalInstance.close();
              }

            },
            size: size,
            resolve: {
              roomtype: function(){
                return selectedRoomtype;
              }
            }
          });
          modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
          }, function(){
            $log.info('Modal dismissed at:' + new Date());
          });
        };

        vm.updateRoomtype = function(size, selectedRoomtype){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomtypeupdate.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope,$modalInstance, roomtype){
              $scope.roomtype = roomtype;

              $scope.ok = function(){

                $modalInstance.close($scope.roomtype);

              };

              $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
              };

            },
            size: size,
            resolve:{
              roomtype: function(){
                return selectedRoomtype;
              }
            }
          });

          modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
          }, function(){
            $log.info('Modal dismissed at:' + new Date());
          });
        };

        vm.createRoomtype = function(size){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomtypecreate.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope,$modalInstance){
              $scope.ok = function(){
                $modalInstance.close();
              };

              $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
              };

            },
            size: size
          });

          modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
          }, function(){
            $log.info('Modal dismissed at:' + new Date());
          });
        };


        vm.removeRoom = function(size, selectedRoom){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomremove.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope, $modalInstance, room){
              $scope.room = room;

              $scope.confirm = function(){
                room.$remove(function(success){
                  $rootScope.$broadcast('room:removed');
                  $modalInstance.close();
                });
              };

              $scope.cancel = function(){
                $modalInstance.close();
              }

            },
            size: size,
            resolve: {
              room: function(){
                return selectedRoom;
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
        vm.updateRoom = function(size, selectedRoom){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomupdate.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope,$modalInstance, room){
              $scope.room = room;

              $scope.ok = function(){

                $modalInstance.close($scope.room);

              };

              $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
              };

            },
            size: size,
            resolve:{
              room: function(){
                return selectedRoom;
              }
            }
          });

          modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
          }, function(){
            $log.info('Modal dismissed at:' + new Date());
          });
        };

        vm.createRoom = function(size){
          var modalInstance = $modal.open({
            templateUrl: 'app/admin/partials/modals/roomcreate.modal.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: function($scope,$modalInstance, Roomtype){

              Roomtype.query(function(roomtypes){
                  $scope.roomtypes = roomtypes;
                }
              );


              $scope.ok = function(){
                $modalInstance.close();
              };

              $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
              };

            },
            size: size
          });

          modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
          }, function(){
            $log.info('Modal dismissed at:' + new Date());
          });
        };

      }])
      .controller('RoomUpdateController', ['$scope','Room', function($scope,Room){
        //update selected guest
        this.update = function(updatedRoom) {
          var room = updatedRoom;
          room.$update(function() {
          }, function(errorResponse) {
            this.error = errorResponse.data.message;
          });
        };
      }])
    .controller('RoomCreateController', ['$scope','Room', '$rootScope' ,
      function($scope, Room, $rootScope){
        this.create = function(newRoom) {
          var room = new Room()
          Room.save({
              number: newRoom.number,
              description: newRoom.description,
              type: newRoom.type
            }
            , function(room) {
              console.log(room);
              $rootScope.$broadcast('room:added');
            }, function(errorResponse) {
              this.error = errorResponse.data.message;
            });
        };
    }])
    .controller('RoomtypeUpdateController', ['$scope', function($scope){
      //update selected guest
      this.update = function(updatedRoom) {
        var room = updatedRoom;
        room.$update(function() {
        }, function(errorResponse) {
          this.error = errorResponse.data.message;
        });
      };
    }])
    .controller('RoomtypeCreateController', ['$scope', 'Roomtype', '$rootScope',
      function($scope , Roomtype, $rootScope){
        this.create = function(newRoomtype) {
          Roomtype.save(newRoomtype, function(roomtype) {
            console.log(roomtype);
            $rootScope.$broadcast('roomtype:added');
          }, function(errorResponse) {
            this.error = errorResponse.data.message;
          });
        };
    }]);

})();
