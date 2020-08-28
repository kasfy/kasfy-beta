export default class HomeController {
	
  constructor() {
    this.foo = "bar";
  }

  welcome(req, res) {

    return res.render("welcome", {"msg": "sample message"});
  } 


  home() {
    return "welcome";
  }

}
