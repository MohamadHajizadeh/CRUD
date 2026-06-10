const express = require('express')
const productRoute = require('./productsRoute')



const port = 3000
const app = express()
app.listen(port, error=>{
    if(error) return console.log(error.message); 
    console.log(`server is listening in port: ${port}`); 
})
app.use(express.json())
app.use(productRoute);