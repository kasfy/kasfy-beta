import { action, get } from "../config/routes";
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
    	res.json({ msg: "login" });
  	}

  	@get("/register")
  	Register(req, res) {
    	res.json({ msg: "Register" });
  	}

  	@get("/home")
  	Home(req, res) {
    	//res.json({ msg: this.home.home() });
    	res.render(this.home.home());
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
