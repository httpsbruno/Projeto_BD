const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CRUD_teste",
  password: "4286",
  port: "5432",
});

module.exports = pool;
