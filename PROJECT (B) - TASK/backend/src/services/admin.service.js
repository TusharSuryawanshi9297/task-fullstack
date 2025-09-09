const { pool } = require("../config/database");
const { hashPassword } = require("../utils/password");

// Dashboard counts
async function dashboardCounts() {
  const [[{ totalUsers }]] = await pool.query(
    "SELECT COUNT(*) as totalUsers FROM users"
  );
  const [[{ totalStores }]] = await pool.query(
    "SELECT COUNT(*) as totalStores FROM stores"
  );
  const [[{ totalRatings }]] = await pool.query(
    "SELECT COUNT(*) as totalRatings FROM ratings"
  );
  return { users: totalUsers, stores: totalStores, ratings: totalRatings };
}

// Create new user (admin)
// async function createUserAdmin({ name, email, address, password, role }) {
//   const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [
//     email,
//   ]);
//   if (exists.length > 0)
//     throw Object.assign(new Error("Email already used"), { status: 409 });

//   const hashed = await hashPassword(password);
//   const [result] = await pool.query(
//     "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
//     [name, email, hashed, address, role]
//   );
//   return { id: result.insertId, name, email, role };
// }

async function createUserAdmin({ name, email, address, password, role }) {
  const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);
  if (exists.length > 0)
    throw Object.assign(new Error("Email already used"), { status: 409 });

  const hashed = await hashPassword(password);
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashed, address, role]
  );

  // Return full user object including address
  return { id: result.insertId, name, email, address, role };
}

// List users with pagination, search, filter
async function listUsers({
  q,
  role,
  sort = "name",
  order = "ASC",
  page = 1,
  limit = 10,
}) {
  let where = "WHERE 1=1";
  const params = [];

  if (q) {
    where += " AND (name LIKE ? OR email LIKE ? OR address LIKE ?)";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (role) {
    where += " AND role = ?";
    params.push(role);
  }

  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    `SELECT id, name, email, address, role 
     FROM users ${where} 
     ORDER BY ${sort} ${order} 
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM users ${where}`,
    params
  );

  return { items: rows, total };
}

// Create new store (admin)
// async function createStoreAdmin({ name, email, address, ownerId }) {
//   const [owner] = await pool.query(
//     "SELECT * FROM users WHERE id = ? AND role = ?",
//     [ownerId, "store_owner"]
//   );
//   if (owner.length === 0)
//     throw Object.assign(new Error("Invalid ownerId"), { status: 400 });

//   const [exists] = await pool.query("SELECT id FROM stores WHERE email = ?", [
//     email,
//   ]);
//   if (exists.length > 0)
//     throw Object.assign(new Error("Store email already used"), { status: 409 });

//   const [result] = await pool.query(
//     "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
//     [name, email, address, ownerId]
//   );
//   return { id: result.insertId, name, email, address, ownerId };
// }

async function createStoreAdmin({ name, email, address, ownerId }) {
  // Validate ownerId
  const [owner] = await pool.query(
    "SELECT * FROM users WHERE id = ? AND role = ?",
    [ownerId, "store_owner"]
  );
  if (owner.length === 0)
    throw Object.assign(new Error("Invalid ownerId"), { status: 400 });

  // Check store email
  const [exists] = await pool.query("SELECT id FROM stores WHERE email = ?", [
    email,
  ]);
  if (exists.length > 0)
    throw Object.assign(new Error("Store email already used"), { status: 409 });

  // Insert store
  const [result] = await pool.query(
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
    [name, email, address, ownerId]
  );

  return {
    id: result.insertId,
    name,
    email,
    address,
    ownerId,
    averageRating: 0,
    totalRatings: 0,
  };
}

// List stores with pagination, search, and average rating
async function listStores({
  q,
  sort = "name",
  order = "ASC",
  page = 1,
  limit = 10,
}) {
  let where = "WHERE 1=1";
  const params = [];

  if (q) {
    where += " AND (s.name LIKE ? OR s.email LIKE ? OR s.address LIKE ?)";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    `SELECT s.id, s.name, s.email, s.address, 
            COALESCE(ROUND(AVG(r.rating),2),0) as averageRating,
            COUNT(r.id) as totalRatings
     FROM stores s
     LEFT JOIN ratings r ON s.id = r.store_id
     ${where}
     GROUP BY s.id
     ORDER BY ${sort} ${order}
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM stores s ${where}`,
    params
  );

  return { items: rows, total };
}

module.exports = {
  dashboardCounts,
  createUserAdmin,
  listUsers,
  createStoreAdmin,
  listStores,
};
