const joi = require('joi');

const productsValidator = (body) => {
    const schema = joi.object({
        product_name: joi.string().min(3).max(20).required(),
        quantity: joi.number().default(0),
        details: joi.string(),
        price: joi.number(),
        is_stock: joi.boolean(),
    })
    return schema.validate(body)
}

module.exports = { productsValidator };