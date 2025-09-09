const express = require("express");
const { browse, rate } = require("../controllers/store.controller");
const { authRequired, allowRoles } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");
const { rateStoreSchema } = require("../validations/schemas");

const router = express.Router();

router.get("/", authRequired, browse);
router.post(
  "/rate",
  authRequired,
  allowRoles("user"),
  validate(rateStoreSchema),
  rate
);

module.exports = router;
