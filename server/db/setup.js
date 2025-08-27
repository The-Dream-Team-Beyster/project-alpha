require('dotenv').config();
const fs = require('fs');
const db = require('./connect');


const sql = fs.readFileSync('./server/db/countries.sql', 'utf8');

db.query(sql)
  .then(() => {
    console.log("✅ Database setup complete!");
  })
  .catch((err) => {
    console.error("❌ Error setting up database:", err);
  })
  .finally(() => {
    db.end();
  });
