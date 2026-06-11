const mongoose = require('mongoose');

// create schema of products table
const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true, minlength: 3, maxlength: 20 },
    quantity: { type: Number, default: 0 },
    details: String,
    price: { type: Number, required: () => this.quantity == 0 ? false : true },
    is_stock: Boolean
})
// using the schema for product collection(table)
const productModel = mongoose.model('Products', productSchema);
// until now we create the schema and our table
// next we need to insert values
module.exports = productModel;