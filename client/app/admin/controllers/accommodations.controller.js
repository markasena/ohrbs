(function () {
    'use strict';
    angular.module('app')

      .controller('AccommodationsController', [ '$scope', 'Accommodation', '$timeout', '$rootScope',
        function($scope, Accommodation, $timeout, $rootScope){

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




      }]);
})();
