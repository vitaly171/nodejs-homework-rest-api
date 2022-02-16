const CreateError = require("http-errors");
const { User, schemas } = require("../../models/user");

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { error } = schemas.subscription.validate(req.body);
    if (error) {
      throw new CreateError(400, "Missing field subscription!");
    }
    const {_id } = req.params;

    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
      throw new CreateError(404, "User not found!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptionUser;
