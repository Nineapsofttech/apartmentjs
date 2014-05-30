
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Iconv  = require('iconv').Iconv;
var ObjectId = mongoose.Types.ObjectId;
var User = require('../models/user.js');
exports.check = function(req,res)
{

  User.find({username : req.query.username}).exec(function(err,result){res.send(result);});
}

exports.login = function(req,res)
{
User.find({username:req.query.username,passwd:req.query.secret}).exec(function(err.result){res.send(result);});

}

exports.add = function(req,res){
  var data;


 
      var user = {}
      var ObjectId = mongoose.Types.ObjectId; 
      var newId = new ObjectId();
      user._id = newId;
   	  user.username=req.query.username;
  user.passwd=req.query.psswd ;
  user.type= req.query.type;
  user.name= req.query.name;
  user.lastname=req.query.lastname;
  user.email= req.query.email;
  user.address= req.query.address;
  user.zipcode= req.query.zipcode;
  user.amphure=req.query.amphure;
  user.district=req.query.district;
  user.province=req.query.province;
  user.tel  = [];
  user.tel=req.query.tel.split(',');
  user.mobile = req.query.mobile.split(',');
  user.fax = req.query.fax;
  user.active=0;
  user.company=req.query.fax,
  user.regisnum=req.query.fax,
  user.capital=req.query.fax,
  user.companyname=req.query.fax,

   console.log(user);




   var newUser = new User(user);
                    newUser.save(function (err) {
                      if (err) {
                        res.send(200, err);
                        return;
                      };
                      res.send(200, newUser);
                      return;
                    });

//console.log(data.test_server.zipcodes[0].zipcode[0]);
//



}