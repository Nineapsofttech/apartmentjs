'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('condoLagoon.services', ['ngResource']).
  value('version', '0.1')
  .factory('Property', ['$resource',
  function($resource){
    return $resource('/properties', {}, {
      query: {method:'GET', params:{location:[]}, isArray:true}
    });
  }]);
