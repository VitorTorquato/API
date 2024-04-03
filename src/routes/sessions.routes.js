const { Router } = require("express");


const SessionsController = require("../controller/SessionsController");

const sessionControler = new SessionsController();

const sessionRoutes = Router();

sessionRoutes.post("/" , sessionControler.create);

module.exports = sessionRoutes;


