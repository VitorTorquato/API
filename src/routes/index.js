const { Router } = require("express");


const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionRoutes = require("./sessions.routes");


const routes = Router();

routes.use("/user" , usersRoutes);
routes.use("/sessions" , sessionRoutes);
routes.use("/notes" , notesRoutes);
routes.use("/tags" , tagsRoutes);


module.exports = routes