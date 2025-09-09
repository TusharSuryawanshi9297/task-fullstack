const bcrypt = require("bcryptjs");

// Hash a plain text password
async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

// Compare plain text password with hash
async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// Password regex: must include uppercase + special char + length 8–16
const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

module.exports = {
  hashPassword,
  comparePassword,
  passwordRegex,
};
