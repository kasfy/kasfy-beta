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
  
import mysql  from "mysql";

export default class mysqlConnection {

	constructor() {
		this.host     = 'localhost';
		this.user     = 'root';
		this.password = '123456';
		this.database = 'test';

		this.connection = mysql.createConnection({
			host     : this.host,
			user     : this.user,
			password : this.password,
			database : this.database
		});
		this.connection.connect(function(err){
			if(!err) {
			    console.log("Database is connected ... \n");
			} else {
			    console.log("Error connecting database ... \n\n");
			}
		});
	}

	async login(req, res, email, password){

		this.connection.query('SELECT * FROM users WHERE email = ? AND password = ?', 
			[email, password], function(error, results, fields) {
			if (results.length == 1) {
				req.session.loggedin = true;
				req.session.username = email;
				console.log("record fetched success ... \n");
				//return {"status" :true, "code": 200};
				return res.redirect("/home");
				//return res.render("home");

			} else {
				//console.log("record fetching failed ... \n");
				//return false;
				return res.render("auth/login", {
				    errors: {
				      	email: {
				        	msg: 'Incorrect Email or Password'
				      	},
				      	password: {
				        	msg: 'Incorrect Email or Password'
				      	}
				    }
				});
			}			
		});
	}

	async register(req, res, username, email, password){

		this.connection.query('INSERT INTO users VALUES (?, ?, ?);', 
			[username, email, password], function(error, results, fields) {
			if (!error) {

				req.session.loggedin = true;
				req.session.username = email;

				return res.redirect("/home");

			} else {
				return res.render("auth/register", {
				    errors: {
				      	email: {
				        	msg: 'check Email or Password'
				      	},
				      	password: {
				        	msg: 'check Email or Password'
				      	}
				    }
				});
			}			
		});
	}
}