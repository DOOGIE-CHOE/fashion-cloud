var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
});

mongoose.model('Products', productSchema);
