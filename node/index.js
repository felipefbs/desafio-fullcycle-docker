const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

async function main() {
  const connection = await getDbConnection();

  app.get("/", async (req, res) => {
    response = "<h1>Full Cycle Rocks!</h1>";

    names = await getNames(connection);
    for (let i = 0; i < names.length; i++) {
      response += names[i];
    }

    res.send(response);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

async function getNames(db) {
  const [rows] = await db.execute("SELECT name FROM `people`");

  return rows.map((r) => `<p> - ${r.name} </p>`);
}

async function getDbConnection() {
  const connection = await mysql.createConnection({
    host: "sql",
    port: 3306,
    user: "root",
    password: "safe_pwd",
    database: "database",
  });

  connection.execute(
    "CREATE TABLE IF NOT EXISTS people(id int auto_increment not null, name varchar(255), primary key(id))"
  );

  connection.execute(
    'INSERT INTO people(name) values ("felipe"), ("henrique"), ("mayara"), ("wesley") '
  );

  return connection;
}

main();
