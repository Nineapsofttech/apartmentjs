var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  _id: Schema.Types.ObjectId,
  propertyId: String,
  title: String,
  type: String,
  locationName: String,
  location: {type: [Number], index: '2d'},
  price: Number,
  rent: Number,
  size: String,
  detail: String,
  images: {type: [String], default:[]},
  updated: {type: Date, default: Date.now},
  date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('property', propertySchema);