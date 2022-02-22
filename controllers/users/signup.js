const createError = require("http-errors");
const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { email, password, subscription, token } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      token,
    });

    res.json({
      status: "success",
      code: 200,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
