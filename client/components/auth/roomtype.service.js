(function () {
  'use strict';

angular.module('app')
  .factory('Roomtype' ,function ($resource) {
    return $resource('/api/roomtype/:id', {
        id: '@_id'
      },{
        get:    {method:'GET'},
        remove: {method:'DELETE'},
        delete: {method:'DELETE'},
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      }
      );
  });
})();
