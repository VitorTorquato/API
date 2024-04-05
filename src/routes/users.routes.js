const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");



const UsersControllers = require("../controller/UsersControllers");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router(); 
const upload = multer(uploadConfig.MULTER);


const usersControllers = new UsersControllers()


usersRoutes.post("/",usersControllers.create); 
usersRoutes.put("/", ensureAuthenticated, usersControllers.upadte); 
usersRoutes.patch("/avatar" , ensureAuthenticated , upload.single("avatar"), (request , respose) => {console.log(request.file.filename);
   respose.json(); 

} )
   

module.exports = usersRoutes;