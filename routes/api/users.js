const express = require("express");
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.get("/logout", authenticate, ctrl.logout);

///Не доделан доп.

router.patch("/:id/subscription", authenticate, ctrl.updateSubscriptionUser);


module.exports = router;