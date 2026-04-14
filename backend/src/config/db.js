const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  user: 'admin',
  password: 'password123',
  database: 'svn_management',
  port: 5432
});

module.exports = pool;