const { Pool } = require('pg');

const pool = new Pool({
  user: 'andrew',
  host: 'localhost',
  database: 'jobtracker',
  password: 'password123',
  port: 5432,
});

module.exports = pool;