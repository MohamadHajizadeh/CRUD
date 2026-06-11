const express = require('express');
const mongoose = require('mongoose');
const customerModel = require('../models/customersModel');
const customerValidator = require('../validators/customersValidator.js');
const router = express.Router();

// create a customer
router.post('/api/customers', async (req, res) => {
    try {
        const { error } = customerValidator(req.body)
        if (error) res.status(400).send({ message: error.message });
        const newCustomer = await new customerModel({
            customer_name: req.body.customer_name,
            tellphone: req.body.tellphone,
            email: req.body.email,
            pro: req.body.pro,
            address: req.body.address
        })
        await newCustomer.save()
        res.send(newCustomer)
        await console.log(`${newCustomer.customer_name} is inserted into database`);

    } catch (error) {
        res.status(400).send(error.message)
    }
})

//get customer list
router.get('/api/customers', async (req, res) => {
    try {
        const customerList = await customerModel.find();
        res.send(customerList)

    } catch (error) {
        res.status(404).send(error.message)
    }
})
// get a customer
router.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        res.send(customer)
    } catch (error) {
        res.status(400).send(error.message)

    }
})
//update a customer
router.put('/api/customers/:id', async (req, res) => {
    try {
        const selectdCustomer = await customerModel.findByIdAndUpdate(req.params.id, {
            customer_name: req.body.customer_name,
            tellphone: req.body.tellphone,
            email: req.body.email,
            pro: req.body.pro,
            address: req.body.address
        })
        const updatedCustomer = await customerModel.findById(req.params.id)
        res.send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// delete a customer
router.delete('/api/customers/:id', async (req, res) => {
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id);
        res.send(`${deletedCustomer.customer_name} is deleted`)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
module.exports = router