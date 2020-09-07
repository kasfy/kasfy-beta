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

const files = fs.readdirSync(pathx);

console.log("\n \n 🔥 Welcome to the Kasfy 🔥 \n\n");

files.forEach(file => {
  fs.readFile(pathx + file, 'utf-8', function(err, content) {
    if (err) {
      	onError(err);
      	return;
    }
    //console.log(file);
    QueryBuilder(content);
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
  	DropAndQueryRunner(data.name, tableQuery);
}

function DropAndQueryRunner(tablename, query) {

	let connection = mysql.createConnection({
	  	host     : process.env.DB_HOST,
	  	user     : process.env.DB_USER,
	  	password : process.env.DB_PASS,
	  	database : process.env.DB_NAME
	});
	
	connection.connect(function(err){
	  	if(err){
	      	console.log("\n ❌ Error connecting database ... \n\n");
	  	}
	});

  	connection.query('DROP TABLE IF EXISTS `'+tablename+'`;', function(err, result, fields){
    	if (err){
        	throw err;
    	} else {
        	console.log(tablename + ' dropped successful');
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
