import mysql  from "mysql";

export default class mysqlConnection {

	constructor() {
		this.host     = 'localhost';
		this.user     = 'root';
		this.password = '123456';
		this.database = 'test';
		this.connection;
	}

	connection() {
		this.connection = mysql.createConnection({
			host     : this.host,
			user     : this.user,
			password : this.password,
			database : this.database
		});
		this.connection.connect(function(err){
			if(!err) {
			    console.log("Database is connected ... nn");
			} else {
			    console.log("Error connecting database ... nn");
			}
		});
	}

	login(req, email, password){

		this.connection();

		this.connection.query('SELECT * FROM users WHERE email = ? AND password = ?', 
			[email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = email;

				return true;

			} else {
				return false
			}			
		});
	}
}