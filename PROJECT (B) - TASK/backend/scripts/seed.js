const { pool } = require("../src/config/database");
const { hashPassword } = require("../src/utils/password");

(async () => {
  try {
    const adminPass = await hashPassword("Admin@123");
    const ownerPass = await hashPassword("Owner@123");

    // Insert admin user
    await pool.query(
      `INSERT IGNORE INTO users (name,email,password,address,role)
       VALUES (?,?,?,?,?)`,
      [
        "Administrator Account Name",
        "admin@example.com",
        adminPass,
        "HQ",
        "admin",
      ]
    );

    // Insert store owner user
    const [owners] = await pool.query("SELECT id FROM users WHERE email=?", [
      "owner@example.com",
    ]);

    let ownerId;
    if (owners.length === 0) {
      const [res] = await pool.query(
        `INSERT INTO users (name,email,password,address,role)
         VALUES (?,?,?,?,?)`,
        [
          "Sample Store Owner Name",
          "owner@example.com",
          ownerPass,
          "Owner Address",
          "store_owner",
        ]
      );
      ownerId = res.insertId;
    } else {
      ownerId = owners[0].id;
    }

    // Insert sample store
    await pool.query(
      `INSERT IGNORE INTO stores (name,email,address,owner_id)
       VALUES (?,?,?,?)`,
      ["Sample Store", "store@example.com", "123, Road, City", ownerId]
    );

    console.log("Seed data inserted ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// const { pool } = require("../src/config/database");
// const { hashPassword } = require("../src/utils/password");

// const sampleUsers = [
//   {
//     name: "Administrator",
//     email: "admin@example.com",
//     password: "Admin@123",
//     address: "Headquarters",
//     role: "admin",
//   },
//   {
//     name: "John Doe",
//     email: "owner1@example.com",
//     password: "Owner@123",
//     address: "123 Main St, City",
//     role: "store_owner",
//   },
//   {
//     name: "Jane Smith",
//     email: "owner2@example.com",
//     password: "Owner@123",
//     address: "45 Market Rd, City",
//     role: "store_owner",
//   },
//   {
//     name: "Alice Johnson",
//     email: "owner3@example.com",
//     password: "Owner@123",
//     address: "78 Suburb Ln, City",
//     role: "store_owner",
//   },
//   {
//     name: "Bob Williams",
//     email: "owner4@example.com",
//     password: "Owner@123",
//     address: "90 Downtown Ave, City",
//     role: "store_owner",
//   },
//   {
//     name: "Charlie Brown",
//     email: "owner5@example.com",
//     password: "Owner@123",
//     address: "11 Riverside Dr, City",
//     role: "store_owner",
//   },
//   {
//     name: "David Miller",
//     email: "user1@example.com",
//     password: "User@123",
//     address: "12 Elm St, City",
//     role: "user",
//   },
//   {
//     name: "Emma Davis",
//     email: "user2@example.com",
//     password: "User@123",
//     address: "34 Pine St, City",
//     role: "user",
//   },
//   {
//     name: "Frank Wilson",
//     email: "user3@example.com",
//     password: "User@123",
//     address: "56 Oak St, City",
//     role: "user",
//   },
//   {
//     name: "Grace Lee",
//     email: "user4@example.com",
//     password: "User@123",
//     address: "78 Maple St, City",
//     role: "user",
//   },
//   {
//     name: "Henry Taylor",
//     email: "user5@example.com",
//     password: "User@123",
//     address: "90 Birch St, City",
//     role: "user",
//   },
//   {
//     name: "Isla Martinez",
//     email: "user6@example.com",
//     password: "User@123",
//     address: "22 Cedar St, City",
//     role: "user",
//   },
//   {
//     name: "Jack Anderson",
//     email: "user7@example.com",
//     password: "User@123",
//     address: "44 Spruce St, City",
//     role: "user",
//   },
//   {
//     name: "Karen Thomas",
//     email: "user8@example.com",
//     password: "User@123",
//     address: "66 Walnut St, City",
//     role: "user",
//   },
//   {
//     name: "Leo White",
//     email: "user9@example.com",
//     password: "User@123",
//     address: "88 Chestnut St, City",
//     role: "user",
//   },
//   {
//     name: "Mia Harris",
//     email: "user10@example.com",
//     password: "User@123",
//     address: "100 Poplar St, City",
//     role: "user",
//   },
// ];

// const sampleStores = [
//   {
//     name: "Central Market",
//     email: "store1@example.com",
//     address: "101 Main St, City",
//     ownerEmail: "owner1@example.com",
//   },
//   {
//     name: "Downtown Deli",
//     email: "store2@example.com",
//     address: "102 Market Rd, City",
//     ownerEmail: "owner2@example.com",
//   },
//   {
//     name: "Suburb Shop",
//     email: "store3@example.com",
//     address: "103 Suburb Ln, City",
//     ownerEmail: "owner3@example.com",
//   },
//   {
//     name: "Riverside Goods",
//     email: "store4@example.com",
//     address: "104 Riverside Dr, City",
//     ownerEmail: "owner5@example.com",
//   },
//   {
//     name: "City Corner Store",
//     email: "store5@example.com",
//     address: "105 Downtown Ave, City",
//     ownerEmail: "owner4@example.com",
//   },
//   {
//     name: "East Side Mart",
//     email: "store6@example.com",
//     address: "106 Elm St, City",
//     ownerEmail: "owner1@example.com",
//   },
//   {
//     name: "West End Supplies",
//     email: "store7@example.com",
//     address: "107 Pine St, City",
//     ownerEmail: "owner2@example.com",
//   },
//   {
//     name: "Green Valley Market",
//     email: "store8@example.com",
//     address: "108 Oak St, City",
//     ownerEmail: "owner3@example.com",
//   },
//   {
//     name: "Lakeside Goods",
//     email: "store9@example.com",
//     address: "109 Maple St, City",
//     ownerEmail: "owner4@example.com",
//   },
//   {
//     name: "Hilltop Shop",
//     email: "store10@example.com",
//     address: "110 Birch St, City",
//     ownerEmail: "owner5@example.com",
//   },
// ];

// (async () => {
//   try {
//     // Insert users
//     for (const user of sampleUsers) {
//       const [exists] = await pool.query("SELECT id FROM users WHERE email=?", [
//         user.email,
//       ]);
//       if (exists.length === 0) {
//         const hashed = await hashPassword(user.password);
//         await pool.query(
//           "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
//           [user.name, user.email, hashed, user.address, user.role]
//         );
//       }
//     }

//     // Insert stores
//     for (const store of sampleStores) {
//       const [owners] = await pool.query(
//         "SELECT id FROM users WHERE email=? AND role='store_owner'",
//         [store.ownerEmail]
//       );
//       if (owners.length > 0) {
//         const ownerId = owners[0].id;

//         const [exists] = await pool.query(
//           "SELECT id FROM stores WHERE email=?",
//           [store.email]
//         );
//         if (exists.length === 0) {
//           await pool.query(
//             "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
//             [store.name, store.email, store.address, ownerId]
//           );
//         }
//       }
//     }

//     console.log("Seed data inserted successfully ✅");
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// })();
