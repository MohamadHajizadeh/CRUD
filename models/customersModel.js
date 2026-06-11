const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customer_name: String,
    tellphone: Number,
    email: String,
    pro: Boolean,
    address: String
})
const customerModel = mongoose.model('customers', customerSchema)
module.exports = customerModel;