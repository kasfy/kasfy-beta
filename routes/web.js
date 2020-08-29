<<<<<<< HEAD
import { action, get, post, put } from "../config/routes";

import HomeController from "../app/controllers/HomeController";

export default class RoutesController {

   @get('/')
   index(req, res) {
     	res.render("welcome");
   }

   @get('/login')
   login(req, res) {
      res.json({msg: "login"});
   }

   @get('/register')
   register(req, res) {
      res.json({msg: "register"});
   }

   @action('post', '/msg')
   foo(req, res) {
      res.json({msg: "this.msg"});
   }

}


/* The NodeJS Framework for Smart Back-End
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| |  ___  ____   | || |      __      | || |    _______   | || |  _________   | || |  ____  ____  | |
| | |_  ||_  _|  | || |     /  \     | || |   /  ___  |  | || | |_   ___  |  | || | |_  _||_  _| | |
| |   | |_/ /    | || |    / /\ \    | || |  |  (__ \_|  | || |   | |_  \_|  | || |   \ \  / /   | |
| |   |  __'.    | || |   / ____ \   | || |   '.___`-.   | || |   |  _|      | || |    \ \/ /    | |
| |  _| |  \ \_  | || | _/ /    \ \_ | || |  |`\____) |  | || |  _| |_       | || |    _|  |_    | |
| | |____||____| | || ||____|  |____|| || |  |_______.'  | || | |_____|      | || |   |______|   | |
| |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
Author : S.Katheeskumar [https://katheesh.github.io]*/ 
=======
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

	@action('post', '/login')
   	Signin(req, res) {
        this.auth.signin(req, res);
   	}

	@action('post', "/register")
	Signup(req, res) { 
		this.auth.signup(req, res);
	}
}
>>>>>>> 6fae47d7c6362c627159f896e26a6f89326478da
