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

export default class AuthController {

  	constructor() {
    	//this.foo = "bar";
  	}

  	login(req, res) {
    	return res.render("auth/login", {errors:{email:{msg:''},password:{msg:''}}});
  	} 

  	register(req, res) {
    	return res.render("auth/register", {errors:{email:{msg:''},name:{msg:''},password:{msg:''}}});
  	}

  	async signin(req, res) {
  		return res.render("auth/login", {
		    data: req.body, // { email, password }
		    errors: {
		      	email: {
		        	msg: 'A message is required'
		      	},
		      	password: {
		        	msg: 'That email doesn‘t look right'
		      	}
		    }
		});
  	}

  	async signup(req, res) {
  		return res.render("auth/register", {
		    data: req.body, // { email, password }
		    errors: {
		      	email: {
		        	msg: 'A message is required'
		      	},
		      	name: {
		        	msg: 'That email doesn‘t look right'
		      	},
		      	password: {
		        	msg: 'That email doesn‘t look right'
		      	}
		    }
		});
  	}

}