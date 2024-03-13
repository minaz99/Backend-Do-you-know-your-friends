const { Pool } = require("pg");

const pool = new Pool({
  host: "knowyourfriendsdb.cdcykqca66z2.eu-north-1.rds.amazonaws.com",
  port: 5432,
  user: "mina",
  password: "minabolt99",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connected to db successfully");
});

module.exports = pool;
