var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Iconv  = require('iconv').Iconv;
var kue = require('kue');
var jobs = kue.createQueue();

var ObjectId = mongoose.Types.ObjectId;
var Property = require('../models/property.js');
var PP = require('../controllers/property.js');
exports.test = function(req, res) {
  var iconv = new Iconv('UTF-8', 'WINDOWS-874');
  var iconv2 = new Iconv('WINDOWS-874', 'UTF-8');
  var test = iconv.convert('ทดสอบ');
  var test2 = iconv2.convert(test);
  res.send(200, {test1:test.toString(), test2:test2.toString()});
};

exports.getinfo = function(req, res){
 

            if(req.query.id!=null)
            {
            Property.findOne({_id: req.query.id}).exec(function(err,result){res.send(result);}); 
              console.log("search for ID"+req.query.id);
  
}
 


};
exports.zip = function(req,res){
fs.readFile('/home/express/apartmentjs/app/zipcodes.xml', function (err, html) {
if (err){
console.log(err);
if(err.errno==34){
res.end('No such file exist');;
}

}else{
  var data;
   var iconv = new Iconv('WINDOWS-874', 'UTF-8//TRANSLIT//IGNORE');

    var body = iconv.convert(new Buffer(html));

    var $ = cheerio.load(body.toString('utf-8'));

    $('zipcodes').filter(function() {
       data += $('zipcode', this);

    });

      res.send( data.html());

}

});

}

exports.getpage=function(req,res)
{

            if(req.query.page!=null)
            {
              var pagenum = req.query.page*15;
            Property.find().skip(pagenum).limit(15).exec(function(err,result){res.send(result);});
            }
}

exports.bot = function (req, res) {
  var url = 'http://www.thaihometown.com/apartment/17818';

  request({url: url, encoding:null}, function (err, response, html) {
    //console.log(html);
    
    var iconv = new Iconv('WINDOWS-874', 'UTF-8//TRANSLIT//IGNORE');

    var body = iconv.convert(new Buffer(html));

    var $ = cheerio.load(body.toString('utf-8'));

    $('.namedesw9').filter(function() {
      var data = $('h1', this);
      res.send( data.html());
    });

    //res.send(html);
  });
};

exports.scrape = function(req, res) {
  //res.charset = 'UTF-8';

  var url = 'http://www.thaihometown.com/apartment/130450';

  
  var iconv = new Iconv('WINDOWS-874', 'UTF-8//TRANSLIT//IGNORE');

  // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

  request({url:url, encoding:null}, function (error, response, html){

    // Convert
    var body = iconv.convert(new Buffer(html));
    //console.log(body.toString());
    //var html = iconv.convert(body);

    // First we'll check to make sure no errors occurred when making the request

    if (!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      //var $ = cheerio.load(html);
      var $ = cheerio.load(body.toString('utf-8'));

      // Finally, we'll define the variables we're going to capture

      var newId = new ObjectId();
      var propertyData = {};

      // Iconv
      //var iconv = new Iconv('windows-874', 'utf-8');

      // Get Id
      var regex = /^http:\/\/www.thaihometown.com\/apartment\/(.*)$/g;
      var result = regex.exec(url);
      if (result && result.length > 0) {
        console.log(result[1]);
        var propertyId = result[1];
        propertyData.propertyId = propertyId;
      };

      // Get Title
      $('.namedesw9').filter(function (){
        var data = $('h1', this);
        var buf = iconv.convert(data.text());
        propertyData.title = data.text();

      });

      $('.headtitle2').filter(function () {
        var data = $('h2', this);
        propertyData.detail = data.text();
      });

      $('#divImg').filter(function() {
        var images = $('img', this);
        console.log(data);
        //var images = data.children()
        propertyData.images = [];
        for (var i = images.length - 1; i >= 3; i--) {
         if( images[i]==null)
          {console.log("img undefined");}
        else{
          propertyData.images.push(images[i].parent.attribs.href);
        }
        };
      });

      var linkPrice = $('.linkprice');
      if (linkPrice.length > 0) {
        linkPrice.filter(function() {
          var str = $(this).text();

          // Kinda sucks but it works!
          var regex = /(.*) ([0-9\.\,]+) (.*)\/(.*)/g;
          var result = regex.exec(str);
          if (result && result.length > 0) {
            
            var rent = parseFloat(result[2].replace(',', ''));
            propertyData.rent = rent;
          };
        })
      };


      if ($('#GMap').length === 0) {
        console.log(propertyData);
        Property.findOne({propertyId: propertyData.propertyId}, function (err, property) {
          if (err) {
            res.send(200, err);
          };

          if (property) {
            Property.findOneAndUpdate({_id: property._id}, propertyData, function (err, property) {
              if (err) {
                res.send(200, err);
                return;
              }
              res.send(200, propertyData);
              return;
              
            });
          } else {
            propertyData._id = newId;
            var newProperty = new Property(propertyData);
            newProperty.save(function (err) {
              if (err) {
                res.send(200, err);
                return;
              };
              res.send(200, propertyData);
              return;
            });
          };
        });
      } else {

        $('#GMap').filter(function() {
          var data = $(this);
          
          //console.log(data.attr('src'));
          request(data.attr('src'), function (error, response, html){
            if (!error) {
              //var $ = cheerio.load(html);
              var regex = /google.maps.LatLng\((.*),(.*)\)/g;
              //var regex = '/google/g';
              //var string = $.html();
              //var result = html.match(/google.maps.LatLng\((.*),(.*)\)/gm);
              var result = regex.exec(html);
              if (result && result.length > 0) {
                var location = result.splice(1, 2);
                propertyData.location = [];

                // Store in lng, lat format.
                propertyData.location.push(location[1]);
                propertyData.location.push(location[0]);
                console.log(propertyData);
                Property.findOne({propertyId: propertyData.propertyId}, function (err, property) {
                  if (err) {
                    res.send(200, err);
                    return;
                  };

                  if (property) {
                    Property.findOneAndUpdate({_id: property._id}, propertyData, function (err, property) {
                      if (err) {
                        res.send(200, err);
                        return;
                      }
                      res.send(200, propertyData);
                      return;
                      
                    });
                  } else {
                    propertyData._id = newId;
                    var newProperty = new Property(propertyData);
                    newProperty.save(function (err) {
                      if (err) {
                        res.send(200, err);
                        return;
                      };
                      res.send(200, propertyData);
                      return;
                    });
                  };
                });
              } else {
                console.log('gotcha');
                return;
              }
            } else {
              console.log(error);
              return;
            }
          });
        });
      };
      
    };
  });
};

exports.getdb = function (req, res1) {


Property.find().limit(20).exec(function (err, result) {

res1.send(result);
});
  

};


exports.getListing = function (req, res) {
  var url = 'http://www.thaihometown.com/apartment/?page=1';
  request(url, function (error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var allUrls = '';
      $('.namedesw_inlist').filter( function () {
        var links = $('a.namelink', this);
        for (var i = links.length - 1; i >= 0; i--) {
          var singleUrl = links[i].attribs.href;
          allUrls += singleUrl + '<br>';
        };
      });
      console.log(allUrls);
      res.send(200, allUrls);
    };
  });
};

exports.createJobs = function (req, res) {
  var url = 'http://www.thaihometown.com/apartment/';
  var maxPage = 48;

  jobs.create('get list', {
    title: 'get list for ' + url,
    url: url
  }).save();
  for (var i = 0; i < maxPage; i++) {
    var url = 'http://www.thaihometown.com/apartment/?page=' +i;
    jobs.create('get list', {
      title: 'get list for ' + url,
      url: url
    }).save();
    console.log("url : " + url)
  };
  res.send(200, 'OK');
};

jobs.process('get list', function (job, done){

  var url = job.data.url;
  console.log('Get List for ' + url);
  request({url: url, encoding:'utf8'}, function (error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var allUrls = '';
      $('.namedesw_inlist').filter( function () {
        var links = $('a.namelink', this);
        for (var i = links.length - 1; i >= 0; i--) {
          var singleUrl = links[i].attribs.href;
          allUrls += singleUrl + '<br>';
          jobs.create('get detail', {
            title: 'get detail for ' + singleUrl,
            url: singleUrl
          }).save();
          console.log("saveSingleUrl : "+ singleUrl);

        };
      });

      //res.send(200, allUrls);
      done();
    } else {
      done(error);
    };
  });
});

jobs.process('get detail', function (job, done) {

  // Get url to fetch from job description
  var url = job.data.url;
  
  // Log to console
 

  // We need to convert obsolete format!!
  var iconv = new Iconv('WINDOWS-874', 'UTF-8//TRANSLIT//IGNORE');


  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request({url: url, encoding:null}, function (error, response, html){

    // First we'll check to make sure no errors occurred when making the request

    if (!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      // Let's the iconv magic begin.
      var body = iconv.convert(new Buffer(html));

      // Use converted utf-8 string instead.
      var $ = cheerio.load(body.toString('utf-8'));

      // Finally, we'll define the variables we're going to capture
      //var title, release, rating;
      //var json = { title : "", release : "", rating : ""};
      var newId = new ObjectId();
      var propertyData = {};

      // Get Id
      var regex = /^http:\/\/www.thaihometown.com\/apartment\/(.*)$/g;
      var result = regex.exec(url);
      if (result && result.length > 0) {
        console.log(result[1]);
        var propertyId = result[1];
        propertyData.propertyId = propertyId;
      };

      // Get Title
      $('.namedesw9').filter(function (){
        var data = $('h1', this);

        //console.log(data.text());
        propertyData.title = data.text().toString('utf8');
      });

      $('.headtitle2').filter(function () {
        var data = $('h2', this);
        //console.log(data.text());
        propertyData.detail = data.text();
      });

      $('#divImg').filter(function() {
        var images = $('img', this);
        //console.log(data);
        //var images = data.children()
        propertyData.images = [];
        for (var i = images.length - 1; i >= 3; i--) {
          console.log(images[i].parent.attribs.href);
          if( images[i]==null)
          {console.log("img undefined");}
        else{
          propertyData.images.push(images[i].parent.attribs.href);
        }
        };
      });

      var linkPrice = $('.linkprice');
      if (linkPrice.length > 0) {
        linkPrice.filter(function() {
          var str = $(this).text();

          // Kinda sucks but it works!
          var regex = /(.*) ([0-9\.\,]+) (.*)\/(.*)/g;
          var result = regex.exec(str);
          if (result && result.length > 0) {
            
            var rent = parseFloat(result[2].replace(',', ''));
            propertyData.rent = rent;
          };
        })
      };


      if ($('#GMap').length === 0) {
        console.log(propertyData);
        Property.findOne({propertyId: propertyData.propertyId}, function (err, property) {
          if (err) {
            done(err);
            return;
          };

          if (property) {
            Property.findOneAndUpdate({_id: property._id}, propertyData, function (err, property) {
              if (err) {
                done(err);
                return;
              }
              done();
              return;
              
            });
          } else {
            propertyData._id = newId;
            var newProperty = new Property(propertyData);
            newProperty.save(function (err) {
              if (err) {
                done(err);
                return;
              };
              //  console.log(newID + " save with map /******************************************* /n");
              done();
              return;
            });
          };
        });
      } else {

        $('#GMap').filter(function() {
          var data = $(this);
          
          //console.log(data.attr('src'));
          request(data.attr('src'), function (error, response, html){
            if (!error) {
              //var $ = cheerio.load(html);
              var regex = /google.maps.LatLng\((.*),(.*)\)/g;
              //var regex = '/google/g';
              //var string = $.html();
              //var result = html.match(/google.maps.LatLng\((.*),(.*)\)/gm);
              var result = regex.exec(html);
              if (result && result.length > 0) {
                var location = result.splice(1, 2);
                propertyData.location = [];

                // Store in lng, lat format.
                propertyData.location.push(location[1]);
                propertyData.location.push(location[0]);
                console.log(propertyData);
                Property.findOne({propertyId: propertyData.propertyId}, function (err, property) {
                  if (err) {
                    done(err);
                    return;
                  };

                  if (property) {
                    Property.findOneAndUpdate({_id: property._id}, propertyData, function (err, property) {
                      if (err) {
                        done(err);
                        return;
                      }
                      done();
                      return;
                      
                    });
                  } else {
                    propertyData._id = newId;
                    var newProperty = new Property(propertyData);
                    newProperty.save(function (err) {
                      if (err) {
                        done(err);
                        return;
                      };
                      done();
                      return;
                    });
                  };
                });
              } else {
              	  //console.log(newID + "save with no map/***************************************");
                done('no map');
                return;
              }
            } else {
              done(error);
              return;
            }
          });
        });
      };

      
    } else {
      console.log("Error detail : "+ error);
      done(error);
    };
  });
});