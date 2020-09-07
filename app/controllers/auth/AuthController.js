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

import mysqlSetup from '../../../config/mysql';

export default class AuthController {

	constructor() {
  	this.mysql = new mysqlSetup();
	}

	login(req, res) {
  	return res.render("auth/login", {req: req, errors:{email:{msg:''},password:{msg:''}}});
	} 

	register(req, res) {
  	return res.render("auth/register", {req: req,errors:{email:{msg:''},username:{msg:''},password:{msg:''}}});
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

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if (email && username && password) {

      this.mysql.register(req, res, username, email, password);

    } else {
  		return res.render("auth/register", {
  			req: req,
		    errors: {
		      	email: {
		        	msg: 'Email is required'
		      	},
		      	username: {
		        	msg: 'Name is required'
		      	},
		      	password: {
		        	msg: 'Password is required'
		      	}
		    }
		  });
    }
	}
}