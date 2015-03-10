(function () {
  'use strict';

angular.module('app')
    .factory('Reservation', function ($resource) {
      return $resource('/api/reservation/:id/:controller', {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
    });
})();
