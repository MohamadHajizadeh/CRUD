const express = require('express');
const Joi = require('joi');
const joi = require('joi');
const mongoose = require('mongoose');

// ##########################################################################
// connect and create database
mongoose.connect('mongodb://localhost:27017/store_db')
    .then(() => console.log('db is connected'))
    .catch(err => console.log(err.message))

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

// const newRow = new productModel({
//     product_name: 'Power Supply',
//     details: 'this is a power supply 200w made in Iran good quality',
//     price: 50000,
//     is_stock: false,
//     quantity: 34
// })

const createNewRow = async (newProduct) => {
    try {
        const createdRow = await newProduct.save();
        await console.log(`${newProduct.product_name} is inserted into database`);
    } catch (err) {
        console.log(err.message);
    }
}
// createNewRow();
// ###############
// select
const selectProductList = async () => {
    try {
        const productList = await productModel.find();
        return await productList;
        // console.log(productList);

    } catch (err) {
        console.log(err.message);
    }
}
// selectProductList();
// ##################
// select a product
const selectProduct = async (id) => {
    try {
        const selectedProduct = await productModel.find({ _id: id });
        console.log(selectedProduct);
        return await selectedProduct;

    } catch (error) {
        console.log(error.message);
    }
}
// selectProduct("6a2923b37ffc5febb4cc8d7d");
// update
const updateRowPrice = async (id, price) => {
    try {
        const updatedRow = await productModel.findByIdAndUpdate(id, { price: price });
        await console.log(`${updatedRow.product_name} is updated`);
    } catch (err) {
        console.log(err.message);
    }
}
// updateRowPrice('6a2924802b327ed93a2260bd',300000);
const updateRowQuanity = async (id, quant) => {
    try {
        const updatedRow = await productModel.findByIdAndUpdate(id, { quantity: quant });
        await console.log(`${updatedRow.product_name} is updated`);
    } catch (err) {
        console.log(err.message);
    }
}
// updateRowQuanity('6a2925293d12b6b2435782f8', 0)
// ############################################################################################
const router = express.Router();

//get a list of product
router.get('/api/products', (req, res) => {
    const getProductList = async () => {
        const productList = await selectProductList();
        await res.send(productList);
    }
    getProductList();
})
// get a product
router.get('/api/products/:id', (req, res) => {
    const getProduct = async () => {
        try {
            const product = await selectProduct(req.params.id);
            res.send(product)
        } catch (error) {
            console.log(error.message);
        }
    }
    getProduct();
})
// ###############
//create a product
router.post('/api/products', (req, res) => {
    const schema = joi.object({
        product_name: joi.string().min(3).max(20).required(),
        quantity: joi.number().default(0),
        details: joi.string(),
        price: joi.number(),
        is_stock: joi.boolean(),
    })

    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send({error: error.message})
    const newProduct = new productModel({
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        details : req.body.details,
        price : req.body.price,
        is_stock : req.body.is_stock
    })
    createNewRow(newProduct);
    res.send(newProduct)
})
module.exports = router;