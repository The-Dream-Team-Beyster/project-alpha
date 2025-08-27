const { Pool } = require('pg');


const db = new Pool({
  connectionString: process.env.DB_URL, 
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

module.exports = db;
