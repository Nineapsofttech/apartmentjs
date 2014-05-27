var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zipcodeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  zipcode: String,
  province: String,
  district: String,
  amphur: String
});


module.exports = mongoose.model('zip', zipcodeSchema);