const { Contact } = require('../../models/contact');
const CreateError = require("http-errors");

const add = async (req, res, next) => {
  try {
            const {error} = schemas.add.validate(req.body);
        if(error){
            throw new CreateError(400, error.message)
        }
    const result = await Contact.create(req.body);
    res.status(201).json(result);

    } catch (error) {
        if(error.message.includes("validation failed")){
            error.status = 400;
        }
        next(error);
    }
}

module.exports = add;
