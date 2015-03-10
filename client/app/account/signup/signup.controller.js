'use strict';

angular.module('app')
  .controller('SignupController', function ($scope, Auth, $location) {

    $scope.guest = {};
    $scope.guest.address = {};
    $scope.account = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.registerGuest(
          {
            firstName:  $scope.guest.firstName,
            lastName:  $scope.guest.lastName,
            address: {
              city:  $scope.guest.address.city,
              street:  $scope.guest.address.street
            },
            contactNumber:  $scope.guest.contactNumber

          },{
            email: $scope.account.email,
            password: $scope.account.password
          }
        )
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
