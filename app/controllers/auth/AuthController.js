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
    	return res.render("auth/login", {req: req, errors:{email:{msg:''},password:{msg:''}}});
  	} 

  	register(req, res) {
    	return res.render("auth/register", {req: req,errors:{email:{msg:''},name:{msg:''},password:{msg:''}}});
  	}

  	home(req, res) {
  		if(req.session.loggedin == true) {
  			return res.render("home", {req: req});
  		} else {
  			return res.redirect("/");
  		}
  	}

  	logout(req, res) {
  		req.session.destroy();
  		return res.redirect("/");
  	}

  	async signin(req, res) {
  		var email = req.body.email;
		var password = req.body.password;

		if (email && password) {

			this.mysql.login(req, res, email, password);

			/*if (this.mysql.login(req, email, password)) {

			} else {
				
			}*/

		} else {
			return res.render("auth/login", {
				req: req,
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
  			req: req,
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