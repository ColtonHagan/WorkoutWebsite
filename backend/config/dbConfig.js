const { createPool } = require('mysql2');

// MySQL connection pool configuration
const pool = createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASS, // Database password
  database: process.env.MYSQL_DB, // Database name
  port: process.env.DB_PORT // Database port
});

module.exports = pool.promise();