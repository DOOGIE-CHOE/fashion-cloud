const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  key: String,
  data: Object,
});

mongoose.model('Products', productSchema);
