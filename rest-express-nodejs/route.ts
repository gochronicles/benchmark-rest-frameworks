import express from "express";
const Router = express.Router();
 
class Hello {
     
    constructor() {
  
        Router.get('/', this.getHello); 
    }
 
    getHello = async (req: any, res: any) => {
       await res.send("Hello World");
    }
  
}
 

new Hello();

module.exports = Router;
