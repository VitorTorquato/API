const {Router} = require("express");


const UsersControllers = require("../controller/UsersControllers");

const usersRoutes = Router(); 



const usersControllers = new UsersControllers()


usersRoutes.post("/",usersControllers.create); 
usersRoutes.put("/:id",usersControllers.upadte); 
   

module.exports = usersRoutes;