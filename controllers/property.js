var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;
var Property = require('../models/property.js');

exports.getProperties = function (req, res) {
  var location = req.param('location');
  location = [ '100', '0' ];
  console.log(location);
  if (location && location.length == 2) {
   /* Property.find({ location: 
      { $near : location,
        $maxDistance : 9999999999999999999999999999999
      } 
    })*/
    Property.find({"location":{$exists:true}}).exec(function (err, properties) {
      if (err) {
        console.log(err);
      };
      console.log(properties);
      res.send(200, properties);
    });
  } else {
    res.send(200, []);
  };
  
};