const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'myuser',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'mydb',
  password: process.env.POSTGRES_PASSWORD || 'mypassword',
  port: 5432,
});

module.exports = pool;
