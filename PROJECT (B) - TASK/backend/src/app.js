require("express-async-errors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const storeRoutes = require("./routes/store.routes");
const ownerRoutes = require("./routes/owner.routes");

const { notFound, errorHandler } = require("./middlewares/error");
const { pool } = require("./config/database");

const app = express();
app.use(helmet());
app.use(xss());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Health check
app.get("/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Health route DB rows:", rows);
    res.json({ status: "ok", db: rows });
  } catch (e) {
    console.error("Health route error:", e); // full error logging
    res.status(500).json({ status: "db_error", error: e.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/owner", ownerRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
