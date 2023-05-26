const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "task_keeper",
  user: "root",
  password: "12345678",
});

let database = pool.promise();

module.exports = database;
