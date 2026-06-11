const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const productModel = require('../models/productsModel');
const { productsValidator } = require('../validators/productsValidators');
// ##########################################################################
// connect and create database


const router = express.Router();

//get a list of product
router.get('/api/products', async (req, res) => {
    try {
        const productList = await productModel.find();
        await res.send(productList);
    } catch (error) {
        res.status(404).send(error.message)
    }
})
// get a product
router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id );
        if(product) return res.send(product)
    } catch (error) {
        console.log(error.message);
    }
})
// ###############
//create a product
router.post('/api/products', async (req, res) => {

    const { error } = productsValidator(req.body)
    if (error) return res.status(400).send({ error: error.message })
    const newProduct = new productModel({
        product_name: req.body.product_name,
        quantity: req.body.quantity,
        details: req.body.details,
        price: req.body.price,
        is_stock: req.body.is_stock
    })
    await newProduct.save();
    res.send(newProduct)
    await console.log(`${newProduct.product_name} is inserted into database`);
})
// ###########################
// update a product
router.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, {
            product_name: req.body.product_name,
            quantity: req.body.quantity,
            details: req.body.details,
            price: req.body.price,
            is_stock: req.body.is_stock
        })
        const{error} = productsValidator(updatedProduct);
        if(error) return res.status(400).send({message: error.message})
        await res.send(updatedProduct)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
})
// ##################
// delete a product
router.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
        res.send(`${deletedProduct.product_name} is deleted`)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
module.exports = router;