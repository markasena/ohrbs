(function () {
  'use strict';

angular.module('app')
    .factory('Accommodation', function ($resource) {
      return $resource('/api/accommodation/:id/', {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
    });
})();
