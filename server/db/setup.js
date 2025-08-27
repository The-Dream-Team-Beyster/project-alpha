const fs = require('fs');
require('dotenv').config();
const db = require('./connect');

const sql = fs.readFileSync('./server/db/setup.sql').toString();

db.query(sql)
  .then(data => { db.end(); console.log("Setup complete")})
  .catch(error => console.log(error));