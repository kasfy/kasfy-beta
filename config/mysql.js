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

import dotenv from "dotenv";

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

export default class mysqlConnection {

	constructor() {

		this.host     = process.env.DB_HOST;
		this.user     = process.env.DB_USER;
		this.password = process.env.DB_PASS;
		this.database = process.env.DB_NAME;

		this.connection = mysql.createConnection({
			host     : this.host,
			user     : this.user,
			password : this.password,
			database : this.database
		});
		
		this.connection.connect(function(err){
			if(!err) {
			    console.log("\n\t✅ Database is connected ... \n");
			} else {
			    console.log("\n\t❌ Connecting error to the database ... \n\n");
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

		this.connection.query('INSERT INTO users VALUES (NULL, ?, ?, ?, NULL);', 
			[username, email, password], function(error, results, fields) {
			if (error) {
				console.log("Error: " + error);
				return res.render("auth/register", {
					req: req,
				    errors: {
				      	username: {
				        	msg: error
				      	},
				      	email: {
				        	msg: error
				      	},
				      	password: {
				        	msg: error
				      	}
				    }
				});
			}
			if (results) {
    			req.session.loggedin = true;
				req.session.username = email;

				return res.redirect("/home");
			}	
		});
	}
}