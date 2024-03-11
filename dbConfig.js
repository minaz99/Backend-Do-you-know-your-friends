const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "mina",
  password: "",
  database: "knowyourfriends",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connected to db successfully");
});

module.exports = pool;
