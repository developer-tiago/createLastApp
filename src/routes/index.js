const { Router } = require('express');

const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/products", productsRouter)

module.exports = routes;