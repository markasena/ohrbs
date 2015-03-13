'use strict';

angular.module('app')
  .controller('SignupController', function ($scope, Guest, $location, User) {

    $scope.guest = {};
    $scope.guest.address = {};
    $scope.account = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Guest.save($scope.guest)
          .$promise.then(
          function(guest){
            $scope.account.owner = guest._id;
            User.save($scope.account)
              .$promise.then(
              function(account){
                $location.path('/');
              },function(err){
                handleError(err);
              }
            );
          },function(err){
           handleError(err);;
          }

        );

      }
    };

    var handleError = function(err){
      err = err.data;
      $scope.errors = {};
      // Update validity of form fields that match the mongoose errors
      angular.forEach(err.errors, function(error, field) {
        form[field].$setValidity('mongoose', false);
        $scope.errors[field] = error.message;
      });
    }

  });
