const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,       // ✅ ps5garage
  password: process.env.DB_PASSWORD, // ✅ Gaming@123
  host: process.env.DB_HOST,       // ✅ localhost
  port: process.env.DB_PORT,       // ✅ 5432
  database: process.env.DB_NAME,   // ✅ ps5gaminggarage
});

module.exports = pool;
