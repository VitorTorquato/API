const {Router} = require("express");


const NotesController = require("../controller/NotesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesRoutes = Router(); 



const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/",notesController.create);
notesRoutes.get("/",notesController.index);
notesRoutes.get("/:id",notesController.show); 
notesRoutes.delete("/:id",notesController.delete); 
   

module.exports = notesRoutes;