import express  from 'express';

import customerValidator from '../validators/customersValidator.js';
import Customer from '../models/customersModel.js';

const customerRouter = express.Router();



// ############# create a customer
customerRouter.post('/api/customers', async (req, res) => {
    try {
        const { error } = customerValidator(req.body)
        if (error) return res.status(400).send({ message: error.message });
        const newCustomer = new Customer({
            customer_name: req.body.customer_name,
            tellphone: req.body.tellphone,
            email: req.body.email,
            pro: req.body.pro,
            address: req.body.address
        })
        await newCustomer.save()
        res.status(201).send(newCustomer)
        console.log(`${newCustomer.customer_name} is inserted into database`);

    } catch (error) {
        res.status(400).send(error.message)
    }
})

//############## get customer list
customerRouter.get('/api/customers', async (req, res) => {
    try {
        const customerList = await Customer.find();
        res.send(customerList)

    } catch (error) {
        res.status(404).send({ message: error.message })
    }
})
// ############# get a customer
customerRouter.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(404).send({ message: "customer not found" })
        res.send(customer)
    } catch (error) {
        res.status(400).send(error.message)

    }
})
// ########### update a customer
customerRouter.put('/api/customers/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            customer_name: req.body.customer_name,
            tellphone: req.body.tellphone,
            email: req.body.email,
            pro: req.body.pro,
            address: req.body.address
        },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) return res.status(404).send({ message: "customer not found" })
        res.send(updatedCustomer);
        //######################
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//##############  delete a customer
customerRouter.delete('/api/customers/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).send({ message: "customer not found" })
        res.send(`${deletedCustomer.customer_name} is deleted`)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

//#############  update with patch
customerRouter.patch('/api/customers/:id', async (req, res) => {
    try {
        const selectedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            customer_name: req.body.customer_name,
            tellphone: req.body.tellphone,
            email: req.body.email,
            pro: req.body.pro,
            address: req.body.address
        }, {
            new: true,
            runValidators: true
        })

        if (!selectedCustomer) return res.status(404).send({ message: "customer not found" })
        res.send(selectedCustomer);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

export default customerRouter;