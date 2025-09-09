const express = require("express");
const {
  dashboard,
  createUser,
  listUsers,
  createStore,
  listStores,
} = require("../controllers/admin.controller");
const { validate } = require("../middlewares/validate");
const {
  createUserSchema,
  createStoreSchema,
} = require("../validations/schemas");
const { authRequired, allowRoles } = require("../middlewares/auth");

const router = express.Router();

router.use(authRequired, allowRoles("admin"));

router.get("/dashboard", dashboard);
router.post("/users", validate(createUserSchema), createUser);
router.get("/users", listUsers);
router.post("/stores", validate(createStoreSchema), createStore);
router.get("/stores", listStores);

module.exports = router;
