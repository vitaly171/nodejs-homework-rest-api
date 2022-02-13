const {Schema, model} = require("mongoose");
const Joi = require("joi");
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, { versionKey: false, timestamps: true });


const Contact = model("contact", contactSchema);

const joiAddContactSchema = Joi.object({
    id: [
        Joi.string(),
        Joi.number()
    ],
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: myCustomJoi.string().phoneNumber(),
    favorite: Joi.boolean()
});

const joiUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    Contact,
    schemas: {
        add: joiAddContactSchema,
        updateFavorite: joiUpdateFavoriteSchema
    }
}
