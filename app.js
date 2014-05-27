// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var kue = require('kue');

var lagoon = require('./controllers/lagoon.js');
var property = require('./controllers/property.js');
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

app.get('/', function (req, res) {
  res.sendfile('/index.html');
});

app.post('/readfile',function(req,res){
fs.readFile(req.body.file_name+'.txt', function (err, data) {
if (err){
console.log(err);
if(err.errno==34){
res.end('No such file exist');;
}

}else{
res.end(data);
}

});
//The below is the synchronous version
// It should be written in try catch to avoid any error
/* try{
var data=fs.readFileSync(req.body.file_name+'.txt');
res.end(data);
}catch(e){
res.end("No such file or directory");
} */
});
app.post('/createfile',function(req,res){
if(req.body.file_name !="" && req.body.file_data !=""){
fs.writeFile(req.body.file_name+'.txt', req.body.file_data, function (err) {
if (err){
console.log(err);
res.end('File could not be saved');
}else{
res.end('File has been saved');
}
});
}else{
res.end('Please provide file name and or content');
}
//The below is the synchronous version
// It should be written in try catch to avoid any error
/* try{
var data=fs.writeFileSync(req.body.file_name+'.txt');
res.end("Data has been written sucessfully");
}catch(e){
res.end("Error occurred");
} */
});

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
app.get('/addzip',zip.add)

// Set server port
app.listen(80);
console.log('server is running');

kue.app.listen(3001);
console.log('kue server is running');
