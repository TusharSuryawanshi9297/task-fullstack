const { pool } = require("../config/database");

// Create store
async function createStore({ name, email, address, owner_id }) {
  const sql = `INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [name, email, address, owner_id]);
  return { id: result.insertId, name, email, address, owner_id };
}

// Get store by ID
async function findStoreById(id) {
  const sql = `SELECT * FROM stores WHERE id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}

// Get all stores (with optional filters)
async function getAllStores({ name, address } = {}) {
  let sql = `SELECT s.*, AVG(r.rating) as avgRating
             FROM stores s
             LEFT JOIN ratings r ON s.id = r.store_id`;
  const params = [];
  const filters = [];

  if (name) {
    filters.push("s.name LIKE ?");
    params.push(`%${name}%`);
  }
  if (address) {
    filters.push("s.address LIKE ?");
    params.push(`%${address}%`);
  }

  if (filters.length) sql += " WHERE " + filters.join(" AND ");
  sql += " GROUP BY s.id";

  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Update store
async function updateStore(id, { name, email, address }) {
  const sql = `UPDATE stores SET name = ?, email = ?, address = ? WHERE id = ?`;
  const [result] = await pool.execute(sql, [name, email, address, id]);
  return result.affectedRows > 0;
}

module.exports = {
  createStore,
  findStoreById,
  getAllStores,
  updateStore,
};
