const Joi = require("joi");
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const contactSchema = Joi.object({
    id: [
        Joi.string(),
        Joi.number()
    ],
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: myCustomJoi.string().phoneNumber()
});

module.exports = contactSchema;