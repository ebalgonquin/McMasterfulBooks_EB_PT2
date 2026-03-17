const { Pool } = require("pg");

const pool = new Pool({
  host: "orders-db",
  user: "orders",
  password: "orders",
  database: "ordersdb",
  port: 5432
});

module.exports = pool;