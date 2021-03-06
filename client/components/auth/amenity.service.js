(function () {
  'use strict';

angular.module('app')
    .factory('Amenity', function ($resource) {
      return $resource('/api/amenities/:id/', {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
    });
})();
