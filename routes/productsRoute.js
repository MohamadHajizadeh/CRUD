import express from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';
import productsValidator from '../validators/productsValidators.js';
import Product from '../models/productsModel.js';
// ##########################################################################

const productRouter = express.Router();

//get a list of product
productRouter.get('/api/products', async (req, res) => {
    try {
        const productList = await Product.find();
        await res.json(productList);
    } catch (error) {
        res.status(404).send(error.message)
    }
})
// get a product
productRouter.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "not found" })
        res.json(product)
    } catch (error) {
        console.log(error.message);
    }
})
// ###############
//create a product
productRouter.post('/api/products', async (req, res) => {

    const { error } = productsValidator(req.body)
    if (error) return res.status(400).send({ error: error.message })
    const newProduct = new Product({
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        details: req.body.details,
        price: req.body.price,
        is_stock: req.body.is_stock
    })
    await newProduct.save();
    res.status(201).json(newProduct)
    await console.log(`${newProduct.product_name} is inserted into database`);
})
// ###########################
// update a product
productRouter.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            product_name: req.body.product_name,
            quantity: req.body.quantity,
            details: req.body.details,
            price: req.body.price,
            is_stock: req.body.is_stock
        }, {
            new: true,
            runValidators: true
        })
        if (!updatedProduct) return res.status(400).send({ message: "product not found" })
        const { error } = productsValidator(updatedProduct);
        if (error) return res.status(400).send({ message: error.message })
        await res.json(updatedProduct)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
})
// ##################
// delete a product
productRouter.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deletedProduct) return res.status(400).json({ messaage: "bad request" })
        res.json(`${deletedProduct.product_name} is deleted`)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
export default productRouter;