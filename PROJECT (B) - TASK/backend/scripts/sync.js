const { pool } = require("../src/config/database");

(async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        address VARCHAR(400),
        role ENUM('admin','user','store_owner') NOT NULL DEFAULT 'user'
      );
    `);

    // Stores table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(400) NOT NULL,
        owner_id INT,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Ratings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        store_id INT,
        rating TINYINT NOT NULL,
        UNIQUE KEY unique_rating (user_id, store_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
      );
    `);

    console.log("DB schema created ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
