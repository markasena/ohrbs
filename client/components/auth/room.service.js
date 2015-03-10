(function () {
  'use strict';

angular.module('app')
  .factory('Room' ,function ($resource) {
    return $resource('/api/rooms/:id', {
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
