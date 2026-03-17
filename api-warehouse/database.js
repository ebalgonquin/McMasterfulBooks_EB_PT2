const { Pool } = require("pg");

const pool = new Pool({
  host: "warehouse-db",
  user: "warehouse",
  password: "warehouse",
  database: "warehousedb",
  port: 5432
});

module.exports = pool;