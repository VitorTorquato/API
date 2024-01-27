const { Router } = require("express");


const usersRouter = require("./users.routes");

const routes = Router();

routes.use("/user" , usersRouter)

module.exports = routes