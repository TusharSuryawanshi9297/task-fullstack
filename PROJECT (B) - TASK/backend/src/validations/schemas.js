const Joi = require("joi");
const { passwordRegex } = require("../utils/password");

// Signup validation
const signupSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).allow("", null),
  password: Joi.string().pattern(passwordRegex).required(),
});

// Login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Password update validation
const passwordUpdateSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(passwordRegex).required(),
});

// Create user (admin) validation
const createUserSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).allow("", null),
  password: Joi.string().pattern(passwordRegex).required(),
  role: Joi.string().valid("admin", "user", "store_owner").required(),
});

// Create store validation
const createStoreSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).required(),
  ownerId: Joi.number().integer().required(),
});

// Rate store validation
const rateStoreSchema = Joi.object({
  storeId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  passwordUpdateSchema,
  createUserSchema,
  createStoreSchema,
  rateStoreSchema,
};
