const express = require("express");
const { dashboard } = require("../controllers/owner.controller");
const { authRequired, allowRoles } = require("../middlewares/auth");

const router = express.Router();

router.use(authRequired, allowRoles("store_owner"));
router.get("/dashboard", dashboard);

module.exports = router;
