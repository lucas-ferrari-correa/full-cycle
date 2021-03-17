const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config);

const createTablePeople = 'CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))';
connection.query(createTablePeople, (err, result) => {
  if (err) throw err;
  console.log('Tabela people criada com sucesso!')
  console.log(result);
});

const insertTablePeople = `INSERT INTO people(name) values('Lucas')`;
connection.query(insertTablePeople, (err, result) => {
  if (err) throw err;
  console.log('Valor Lucas inserido na tabela people com sucesso')
  console.log(result);
});

const selectTablePeople = `SELECT name FROM people`;
let selectedName;
connection.query(selectTablePeople, (err, result, fields) => {
  if (err) throw err;
  selectedName = result[0].name;
});

connection.end;

app.get('/', (req, res) => {
  res.send(`<h1>Full Cycle Rocks!</h1><h1>${selectedName}</h1>`)
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
});
