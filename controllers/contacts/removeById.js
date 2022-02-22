const { Contact } = require("../../models/contact");
const CreateError = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = removeById;
