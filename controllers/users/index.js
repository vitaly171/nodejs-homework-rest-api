const login = require("./login");
const signup = require("./signup");
const current = require("./current");
const logout = require("./logout");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatar = require("./updateAvatar");
const sendVerificationMail = require("./sendVerificationMail");
const verify = require("./verify");

module.exports = {
  login,
  signup,
  current,
  logout,
  updateSubscriptionUser,
  updateAvatar,
  sendVerificationMail,
  verify,
};
