const joi = require('joi')

const customerValidator = (body) => {
    const schema = joi.object({
        customer_name: joi.string().min(3).max(20).required(),
        tellphone: joi.number().required(),
        email: joi.string().required(),
        pro: joi.boolean().default(false),
        address: joi.string()
    })
    return schema.validate(body)
}

// export default customerValidator; 
module.exports = customerValidator;