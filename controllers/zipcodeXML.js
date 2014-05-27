
var mongoose = require('mongoose');

var jobs = kue.createQueue();
var ObjectId = mongoose.Types.ObjectId;

var ObjectId = mongoose.Types.ObjectId;





var conn = mongoose.connection;




 xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","zipcodes.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 
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


}