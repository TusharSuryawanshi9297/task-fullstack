const { pool } = require("../config/database");

async function searchStores({
  userId,
  q,
  sort = "name",
  order = "ASC",
  page = 1,
  limit = 10,
}) {
  let where = "WHERE 1=1";
  const params = [];

  if (q) {
    where += " AND (s.name LIKE ? OR s.address LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    `SELECT s.id, s.name, s.address,
            COALESCE(ROUND(AVG(r.rating),2),0) as overallRating
     FROM stores s
     LEFT JOIN ratings r ON s.id = r.store_id
     ${where}
     GROUP BY s.id
     ORDER BY ${sort} ${order}
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  // attach current user's rating
  const ids = rows.map((r) => r.id);
  let userRatings = [];
  if (ids.length > 0) {
    [userRatings] = await pool.query(
      "SELECT store_id, rating FROM ratings WHERE user_id = ? AND store_id IN (?)",
      [userId, ids]
    );
  }

  const map = new Map(userRatings.map((r) => [r.store_id, r.rating]));
  const items = rows.map((s) => ({ ...s, userRating: map.get(s.id) ?? null }));

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM stores s ${where}`,
    params
  );

  return { items, total };
}

async function rateStore({ userId, storeId, rating }) {
  const [exists] = await pool.query(
    "SELECT id FROM ratings WHERE user_id = ? AND store_id = ?",
    [userId, storeId]
  );

  if (exists.length > 0) {
    await pool.query(
      "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
      [rating, userId, storeId]
    );
    return { updated: true };
  } else {
    await pool.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
      [userId, storeId, rating]
    );
    return { created: true };
  }
}

module.exports = {
  searchStores,
  rateStore,
};
