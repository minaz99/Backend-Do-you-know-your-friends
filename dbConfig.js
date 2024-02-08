const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "databasename",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connected to db successfully");
});

module.exports = pool;
