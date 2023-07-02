//Importando Router dentro do express
const { Router } = require('express'); 

//Importando o ProductsController
const ProductsController = require('../controllers/ProductsController');

//Executando o Router
const productsRoutes = Router();

//Reservando espaço em memória para a classe
const productsController = new ProductsController();

productsRoutes.post("/:user_id", productsController.create);

//Exportando a váriavel productsRoutes
module.exports = productsRoutes;