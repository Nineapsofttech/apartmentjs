'use strict';

/* Controllers */

angular.module('condoLagoon.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MainCtrl', ['$scope', '$rootScope', 'Property', 
    function ($scope, $rootScope, Property) {

    // Initialize scope markers
    $scope.condos = [];
    
    $scope.$on('mapReady', function (event) {
     // $scope.status = 'Ready';


      var mapOptions = {
        zoom: 10
      };

      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
            map: $scope.map,
            position: pos,
            content: 'Your Current Location'
          });

          $scope.map.setCenter(pos);

          // Show the condos !
          $scope.showMeTheCondo(position);
          
        }, function() {
          $scope.handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        $scope.handleNoGeolocation(false);
      }
    });

    $scope.handleNoGeolocation = function (errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed. Please click on the map to change location.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation. Please click on the map to change location.';
      }

      var options = {
        map: $scope.map,
        position: new google.maps.LatLng(13.883661700000001, 100.5698831),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      $scope.map.setCenter(options.position);
    };

    $scope.showMeTheCondo = function (position) {
      // Should load something
      var condos = [];
      Property.query({
        location:[position.coords.longitude, position.coords.latitude]
      }, function (res) {
        // Create marker here
        for (var i = 0; i < res.length; i++) {
          //console.log(res[i]);

          // Convert LngLat to LatLng
          var latLng = new google.maps.LatLng(res[i].location[1], res[i].location[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            title:res[i].title
          });

          marker.setMap($scope.map);

          var contentString = '<h2> <a href="http://192.168.1.7:8080/worldresiden/info.php?id='+res[i]._id+'" target="_blank">' + res[i].title + '</a></h2> ' +
          '<p>ค่าเช่า' + res[i].rent + ' บาท</p><br>';

          if (res[i].images && res[i].images.length > 0) {
            contentString += '<img src="' + res[i].images[3] + '"><br>';
          };
          
          // Use closure to add info properly
          $scope.attachInfo(marker, contentString);
        };
      });
    };

    $scope.attachInfo = function (marker, content) {
      var infowindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    };
  }]);