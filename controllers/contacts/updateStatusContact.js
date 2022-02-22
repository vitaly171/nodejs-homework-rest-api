const { Contact, schemas } = require("../../models/contact");

const CreateError = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw new CreateError(400, "Missing field favorite!");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new CreateError(404, "Contact not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateStatusContact;
