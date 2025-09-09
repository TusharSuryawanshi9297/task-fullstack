const express = require("express");
const {
  signup,
  login,
  updatePassword,
} = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validate");
const {
  signupSchema,
  loginSchema,
  passwordUpdateSchema,
} = require("../validations/schemas");
const { authRequired } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.put(
  "/password",
  authRequired,
  validate(passwordUpdateSchema),
  updatePassword
);

module.exports = router;
