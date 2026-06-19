import mongoose from 'mongoose'
const customerSchema = new mongoose.Schema({
    customer_name: String,
    tellphone: Number,
    email: String,
    pro: Boolean,
    address: String
})
const Customer = mongoose.model('customers', customerSchema);

export default Customer;