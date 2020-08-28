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

export default class WebController {

	constructor() {
		this.home = new HomeController();
	}

	@get("/")
	welcome(req, res) {
		this.home.welcome(req, res);
	}

	@get("/login")
	Login(req, res) {
		res.json({
			msg: "login"
		});
	}

	@get("/register")
	Register(req, res) {
		res.json({
			msg: "Register"
		});
	}

	@post("/login")
	Login(req, res) {

	}

	@post("/register")
	Register(req, res) {

	}
}