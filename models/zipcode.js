var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zipcodeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  zipcode: String,
  province_name: String,
  district_name: String,
  amphur_name: String,
  updated: {type: Date, default: Date.now},
  date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('zip', zipcodeSchema);