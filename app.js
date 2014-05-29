// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var kue = require('kue');

var lagoon = require('./controllers/lagoon.js');
var property = require('./controllers/property.js');
var user = require('./controllers/user.js');
//var zip = require("./controllers/zipcodeXML.js")

app.use(express.static('app'));
app.set('databaseIP', 'localhost');
app.set('databasePort', '27017');
app.set('databaseName', 'apartment');
// connect database
mongoose.connect('mongodb://' + app.get('databaseIP') + ':' + app.get('databasePort') + '/' + app.get('databaseName'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.all('http://apsoftapi.no-ip.org', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/adduser',user.add);
app.get('/', function (req, res) {
  res.sendfile('/index.html');
});
app.get('/zip',lagoon.zipfind);
app.get('/page',lagoon.getpage);
// Restful API
app.get('/properties', property.getProperties);
//app.get('/properties/:id', lagoon.getPropertyDetail);
app.get('/info',lagoon.getinfo);
//app.get('/test', lagoon.test);
app.get('/getdb',lagoon.getdb);
app.get('/scrape', lagoon.scrape);
app.get('/list',lagoon.getListing);
app.get('/createjobs', lagoon.createJobs);
app.get('/bot', lagoon.bot);
app.get('/addzip',lagoon.zip)

// Set server port
app.listen(80);
console.log('server is running');

kue.app.listen(3001);
console.log('kue server is running');
