/* The NodeJS Framework for Smart Back-End
   ▄█   ▄█▄    ▄████████    ▄████████    ▄████████ ▄██   ▄   
  ███ ▄███▀   ███    ███   ███    ███   ███    ███ ███   ██▄ 
  ███▐██▀     ███    ███   ███    █▀    ███    █▀  ███▄▄▄███ 
 ▄█████▀      ███    ███   ███         ▄███▄▄▄     ▀▀▀▀▀▀███ 
▀▀█████▄    ▀███████████ ▀███████████ ▀▀███▀▀▀     ▄██   ███ 
  ███▐██▄     ███    ███          ███   ███        ███   ███ 
  ███ ▀███▄   ███    ███    ▄█    ███   ███        ███   ███ 
  ███   ▀█▀   ███    █▀   ▄████████▀    ███         ▀█████▀  
  ▀ Author : S.Katheeskumar [https://katheesh.github.io] */

var fs = require('fs');
const dotenv = require('dotenv').config({ path: '../.env' });
var mysql = require('mysql');

var pathx = __dirname.substring(0, __dirname.length - 6) + "database/migrations/";
var seeds = __dirname.substring(0, __dirname.length - 6) + "database/seeds/";

const files = fs.readdirSync(pathx);

console.log("\n \n 🔥 Welcome to the Kasfy 🔥 \n\n");

files.forEach(file => {
  fs.readFile(pathx + file, 'utf-8', function(err, content) {
    if (err) {
      onError(err);
      return;
    }
    QueryBuilder(content);
  });
});

files.forEach(file => {
  fs.readFile(seeds + file, 'utf-8', function(err, content) {
    if (err) {
      onError(err);
      return;
    }
    SeedBuilder(content);
  });
});

function QueryBuilder(content) {

  let data = JSON.parse(content);
  let fields = data.fields;
  let tableQuery = `CREATE TABLE ${data.name} ( ${data.primary} int NOT NULL PRIMARY KEY,`;
                 
  for (key in fields) {
    if (fields.hasOwnProperty(key)) {
      tableQuery += key + " " + fields[key] + ", ";
    }
  } 

  tableQuery = tableQuery.substring(0, tableQuery.length - 2);

  tableQuery += ` );`

  //console.log(tableQuery);
  QueryRunner(tableQuery, data.name);
}

function QueryRunner(query, tablename) {
  let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
  connection.connect(function(err){
    if(err) {
      console.log("\n ❌ Error connecting database ... \n\n");
    }
  });
  connection.query(query, function(err, result, fields){
    if (err) {
      throw err;
    } else {
      console.log(tablename + ' migrating successful');
      connection.end();
    }
  });
}


function SeedBuilder(content) {
  let data = JSON.parse(content);
  let fields = data.fields;
  let tableQuery = `INSERT INTO ${data.to_seed} (column1, column2, column3)
VALUES (value1, value2, value3);`;
                 
  for (key in fields) {
    if (fields.hasOwnProperty(key)) {
      tableQuery += key + " " + fields[key] + ", ";
    }
  } 

  tableQuery = tableQuery.substring(0, tableQuery.length - 2);

  tableQuery += ` );`

  //console.log(tableQuery);
}