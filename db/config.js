const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'calculator-db.cskrza2seurw.us-east-1.rds.amazonaws.com',
  database: 'calculator-db',
  password: 'calculator123',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
