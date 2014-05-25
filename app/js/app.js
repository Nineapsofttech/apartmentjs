'use strict';


// Declare app level module which depends on filters, and services
angular.module('condoLagoon', [
  'ngRoute',
  'condoLagoon.filters',
  'condoLagoon.services',
  'condoLagoon.directives',
  'condoLagoon.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'partials/main.html', 
    controller: 'MainCtrl'
  });
  $routeProvider.when('/view1', {
    templateUrl: 'partials/partial1.html', 
    controller: 'MyCtrl1'
  });
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html', 
    controller: 'MyCtrl2'
  });
  $routeProvider.otherwise({redirectTo: '/main'});
}])
.run(['$rootScope', '$window', function($rootScope, $window) {

  
  $window.initMap = function () {
   // $rootScope.status = 'Ready';
    $rootScope.$broadcast('mapReady', true);
    
  };
  
  // IIFE
  (function(d){
    // load the Google Maps javascript API V.3 asynchronously
    var script = d.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZ1QLmqK95Rv1nUCa2--sH7ZECo3Tf-tw&v=3.exp&sensor=true&' +
        'callback=initMap';
    d.body.appendChild(script);

  }(document));
}]);
