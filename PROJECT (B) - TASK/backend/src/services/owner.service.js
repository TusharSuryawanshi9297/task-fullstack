const { pool } = require("../config/database");

async function ownerDashboard(ownerId) {
  // Get the store owned by this owner
  const [stores] = await pool.query("SELECT * FROM stores WHERE owner_id = ?", [
    ownerId,
  ]);

  if (stores.length === 0)
    return { store: null, averageRating: null, raters: [] };

  const store = stores[0];

  // Calculate average rating for this store
  const [[{ avg }]] = await pool.query(
    "SELECT ROUND(AVG(rating),2) as avg FROM ratings WHERE store_id = ?",
    [store.id]
  );

  // Get users who rated this store
  const [raters] = await pool.query(
    `SELECT u.id, u.name, u.email, u.address, r.rating
     FROM ratings r
     JOIN users u ON r.user_id = u.id
     WHERE r.store_id = ?
     ORDER BY r.id DESC`,
    [store.id]
  );

  return { store, averageRating: avg ?? null, raters };
}

module.exports = {
  ownerDashboard,
};
