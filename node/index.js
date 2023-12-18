const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  response = "<h1>Full Cycle Rocks!</h1>";

  names = await getNames();
  for (let i = 0; i < names.length; i++) {
    response += names[i];
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function getNames() {
  const connection = await mysql.createConnection({
    host: "sql",
    port: 3306,
    user: "root",
    password: "safe_pwd",
    database: "database",
  });

  const [rows] = await connection.execute("SELECT name FROM `people`");

  return rows.map((r) => `<p> - ${r.name} </p>`);
}
