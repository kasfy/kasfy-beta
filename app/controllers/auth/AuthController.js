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

import mysqlConnection from '../../../config/mysqlConnection';

export default class AuthController {

  	constructor() {
    	this.mysql = new mysqlConnection();
  	}

  	login(req, res) {
    	return res.render("auth/login", {errors:{email:{msg:''},password:{msg:''}}});
  	} 

  	register(req, res) {
    	return res.render("auth/register", {errors:{email:{msg:''},name:{msg:''},password:{msg:''}}});
  	}

  	async signin(req, res) {
  		var email = req.body.email;
		var password = req.body.password;

		if (email && password) {

			if (this.mysql.login(req, email, password)) {
				
				return res.render("home");

			} else {
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

		} else {
			return res.render("auth/login", {
			    data: req.body, // { email, password }
			    errors: {
			      	email: {
			        	msg: 'Email is required'
			      	},
			      	password: {
			        	msg: 'Password is required'
			      	}
			    }
			});
		}
  		
  	}

  	async signup(req, res) {
  		return res.render("auth/register", {
		    data: req.body, // { email, password }
		    errors: {
		      	email: {
		        	msg: 'Email is required'
		      	},
		      	name: {
		        	msg: 'Name is required'
		      	},
		      	password: {
		        	msg: 'Password is required'
		      	}
		    }
		});
  	}

}