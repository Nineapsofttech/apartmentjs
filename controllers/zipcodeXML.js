
var mongoose = require('mongoose');
var request = require('request');
var ObjectId = mongoose.Types.ObjectId;
var Iconv  = require('iconv').Iconv;
var cheerio = require('cheerio');
var fs = require('fs');



var conn = mongoose.connection;



exports.add = function(req, res){
 



 request({url: "zipcodes.xml", encoding:null}, function (err, response, html) {
    //console.log(html);
    
    var iconv = new Iconv('WINDOWS-874', 'UTF-8');

    //var body = iconv.convert(new Buffer(html));

  //  var $ = cheerio.load(body.toString('utf-8'));
    send("200",html);

/*
var x=xmlDoc.getElementsByTagName("zipcodes");
for(var x = 0;x<x.length;x++) 
{
var newId = new ObjectId();
var zipcodeData = {};
zipcodeData._id = newId;
zipcodeData.zipcode =x[i].getElementsByTagName("zipcode")[0].childNodes[0].nodeValue ;
zipcodeData.province_name=x[i].getElementsByTagName("province_name")[0].childNodes[0].nodeValue ;
zipcodeData.district_name=x[i].getElementsByTagName("district_name")[0].childNodes[0].nodeValue;
zipcodeData.amphur_name=x[i].getElementsByTagName("amphur_name")[0].childNodes[0].nodeValue;

conn.collection('zipcode').insert(zipcodeData);

console.log("add" + newId);
	}

*/
  }); 

}