const { pool } = require("../config/database");

// Create rating
async function createRating({ user_id, store_id, rating }) {
  const sql = `INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)`;
  try {
    const [result] = await pool.execute(sql, [user_id, store_id, rating]);
    return { id: result.insertId, user_id, store_id, rating };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      throw new Error("User has already rated this store");
    throw err;
  }
}

// Update rating
async function updateRating({ user_id, store_id, rating }) {
  const sql = `UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?`;
  const [result] = await pool.execute(sql, [rating, user_id, store_id]);
  return result.affectedRows > 0;
}

// Get all ratings for a store
async function getRatingsByStore(store_id) {
  const sql = `SELECT r.*, u.name as user_name, u.email as user_email
               FROM ratings r
               JOIN users u ON r.user_id = u.id
               WHERE r.store_id = ?`;
  const [rows] = await pool.execute(sql, [store_id]);
  return rows;
}

// Get user's rating for a store
async function getUserRatingForStore(user_id, store_id) {
  const sql = `SELECT * FROM ratings WHERE user_id = ? AND store_id = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [user_id, store_id]);
  return rows[0];
}

// Get average rating
async function getAverageRating(store_id) {
  const sql = `SELECT AVG(rating) as avgRating FROM ratings WHERE store_id = ?`;
  const [rows] = await pool.execute(sql, [store_id]);
  return rows[0]?.avgRating || 0;
}

module.exports = {
  createRating,
  updateRating,
  getRatingsByStore,
  getUserRatingForStore,
  getAverageRating,
};
