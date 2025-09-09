const { pool } = require("../config/database");
const UserModel = require("./User");
const StoreModel = require("./Store");
const RatingModel = require("./Rating");

// Get all stores owned by a user
async function getStoresByOwner(owner_id) {
  const sql = `SELECT * FROM stores WHERE owner_id = ?`;
  const [rows] = await pool.execute(sql, [owner_id]);
  return rows;
}

// Get owner of a store
async function getStoreOwner(store_id) {
  const sql = `
    SELECT u.id, u.name, u.email, u.address
    FROM users u
    JOIN stores s ON s.owner_id = u.id
    WHERE s.id = ?
  `;
  const [rows] = await pool.execute(sql, [store_id]);
  return rows[0];
}

// Get all stores rated by a user
async function getRatedStoresByUser(user_id) {
  const sql = `
    SELECT s.*, r.rating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    WHERE r.user_id = ?
  `;
  const [rows] = await pool.execute(sql, [user_id]);
  return rows;
}

// Get all users who rated a store
async function getRatersByStore(store_id) {
  const sql = `
    SELECT u.*, r.rating
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.store_id = ?
  `;
  const [rows] = await pool.execute(sql, [store_id]);
  return rows;
}

// Get rating of a user for a store
async function getUserRatingForStore(user_id, store_id) {
  return RatingModel.getUserRatingForStore(user_id, store_id);
}

// Get average rating of a store
async function getAverageRating(store_id) {
  return RatingModel.getAverageRating(store_id);
}

module.exports = {
  getStoresByOwner,
  getStoreOwner,
  getRatedStoresByUser,
  getRatersByStore,
  getUserRatingForStore,
  getAverageRating,
};
