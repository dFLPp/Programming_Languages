const express = require("express");
const { login, dashboard } = require("../Controllers/mainController")
//Sim, podemos usar middlewares no Router (em casos mais complexos, Routers em Routers)
const  authMiddleware  = require("../Middleware/authMiddleware")

const mainRouter = express.Router();

mainRouter.use('/dashboard', authMiddleware)

mainRouter.get('/dashboard', dashboard);
mainRouter.post('/login', login);


module.exports = mainRouter;