const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");

const ROLES = {
  ADMIN: "admin",
  USER: "user",
  OWNER: "store_owner",
};

// Create a new user
async function createUser({
  name,
  email,
  password,
  address,
  role = ROLES.USER,
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [
    name,
    email,
    hashedPassword,
    address,
    role,
  ]);
  return { id: result.insertId, email };
}

// Find user by email
async function findUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [email]);
  return rows[0];
}

// Compare password
async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// Find user by ID
async function findUserById(id) {
  const sql = `SELECT * FROM users WHERE id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}

module.exports = {
  ROLES,
  createUser,
  findUserByEmail,
  findUserById,
  comparePassword,
};
