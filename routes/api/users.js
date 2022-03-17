const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const router = express.Router();
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");

const Jimp = require("jimp");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.get("/logout", authenticate, ctrl.logout);

//const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

///Не доделан доп.

router.patch("/:id/subscription", authenticate, ctrl.updateSubscriptionUser);

module.exports = router;
