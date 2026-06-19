import mongoose from 'mongoose'
// create schema of products table
const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true, minlength: 3, maxlength: 20 },
    quantity: { type: Number, default: 0 },
    details: String,
    price: { type: Number, required: true },
    is_stock: Boolean
})
const Product = mongoose.model('Products', productSchema);

export default Product;