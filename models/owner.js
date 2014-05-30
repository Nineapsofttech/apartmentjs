var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  _id: Schema.Types.ObjectId,
  building_name:String,
  address:String,
  tel:Number,
fax:Number,
detail:String,
water_cost:Number,

  updated: {type: Date, default: Date.now},
  date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('user', user);