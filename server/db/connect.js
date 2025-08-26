const { Pool } = require('pg');

// database connection pool
const db = new Pool({
  connectionString: process.env.DB_URL, // stored in .env
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

module.exports = db;
