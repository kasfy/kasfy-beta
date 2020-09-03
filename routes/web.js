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

import { action, get, post, put } from "../config/routes";

import HomeController from "../app/controllers/HomeController";
import AuthController from "../app/controllers/auth/AuthController";

export default class WebController {

	constructor() {
		this.home = new HomeController();
		this.auth = new AuthController();
	}

	@get("/")
	welcome(req, res) {
		this.home.welcome(req, res);
	}

	@get("/login")
	Login(req, res) {
		this.auth.login(req, res);
	}

	@get("/register")
	Register(req, res) {
		this.auth.register(req, res);
	}

	@get("/home")
	Home(req, res) {
		this.auth.home(req, res);
	}

	@get("/logout")
	Logout(req, res) {
		this.auth.logout(req, res);
	}

	@action('post', '/login')
   	Signin(req, res) {
        this.auth.signin(req, res);
   	}

	@action('post', "/register")
	Signup(req, res) { 
		this.auth.signup(req, res);
	}
}