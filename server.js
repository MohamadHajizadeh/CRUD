const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productsRoute')
const customerRoute = require('./routes/customersRoute')
// connect and create database

mongoose.connect('mongodb://localhost:27017/store_db')
    .then(() => console.log('db is connected'))
    .catch(err => console.log(err.message))

const port = 3000
const app = express()
app.listen(port, error=>{
    if(error) return console.log(error.message); 
    console.log(`server is listening in port: ${port}`); 
})
app.use(express.json())
app.use(productRoute);
app.use(customerRoute)