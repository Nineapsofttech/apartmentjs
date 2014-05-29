var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  passwd: String,
  type: String,
  name: String,
  lastname: String,
  email: String,
  address: String,
  zipcode: Number,
  amphure:String,
  district:String,
  province:String,
  tel:{type: [String], default:[]},
  mobile:{type: [String], default:[]},
  company:String,
  regisnum:String,
  capital:Number,
  companyname:String,
  fax:String,
  active:Number,
  updated: {type: Date, default: Date.now},
  date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('user', user);