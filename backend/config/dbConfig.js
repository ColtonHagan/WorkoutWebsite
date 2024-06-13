const { createPool } = require('mysql2');

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.DB_PORT,
  connectionLimit: 10
});

module.exports = pool.promise();