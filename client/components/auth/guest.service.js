(function () {
  'use strict';

angular.module('app')
    .factory('Guest', function ($resource) {
      return $resource('/api/guests/:id/', {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
    });
})();
