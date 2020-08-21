export default class HomeController {

   constructor() {
      this.foo = 'bar';
   }
 
   index(req, res) {
      res.json( {msg: "hello world"} );
   }

}

