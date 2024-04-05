const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");



const UsersControllers = require("../controller/UsersControllers");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const UserAvatarController = require("../controller/UserAvatarController");


const usersRoutes = Router(); 
const upload = multer(uploadConfig.MULTER);


const userAvatarContorller = new UserAvatarController();
const usersControllers = new UsersControllers()


usersRoutes.post("/",usersControllers.create); 
usersRoutes.put("/", ensureAuthenticated, usersControllers.upadte); 
usersRoutes.patch("/avatar" , ensureAuthenticated , upload.single("avatar") , userAvatarContorller.update )
   

module.exports = usersRoutes;UserAvatarController