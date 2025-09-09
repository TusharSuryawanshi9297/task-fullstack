const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const { hashPassword, comparePassword } = require("../utils/password");
require("dotenv").config();

async function signup({ name, email, address, password }) {
  const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  if (existing.length > 0)
    throw Object.assign(new Error("Email already used"), { status: 409 });

  const hashed = await hashPassword(password);

  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashed, address, "user"]
  );

  return { id: result.insertId, email };
}

async function login({ email, password }) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const user = rows[0];

  const ok = await comparePassword(password, user.password);
  if (!ok)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set in .env");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

async function updatePassword(userId, { oldPassword, newPassword }) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);

  if (rows.length === 0)
    throw Object.assign(new Error("User not found"), { status: 404 });

  const user = rows[0];
  const ok = await comparePassword(oldPassword, user.password);
  if (!ok)
    throw Object.assign(new Error("Old password incorrect"), { status: 400 });

  const hashed = await hashPassword(newPassword);

  await pool.query("UPDATE users SET password = ? WHERE id = ?", [
    hashed,
    userId,
  ]);

  return true;
}

module.exports = {
  signup,
  login,
  updatePassword,
};
