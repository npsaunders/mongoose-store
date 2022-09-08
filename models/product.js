const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  price: { type: Number, required: true, minimum: 0 },
  qty: { type: Number, required: true, minimum: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;