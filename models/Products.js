/**
 * since it's receiving random dummy data,
 * I added a property called data for random data
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  key: String,
  data: Object,
});

mongoose.model('Products', productSchema);
