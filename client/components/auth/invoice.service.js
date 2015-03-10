(function () {
  'use strict';

angular.module('app')
    .factory('Invoice', function ($resource) {
      return $resource('/api/invoice/:id/', {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
    });
})();
