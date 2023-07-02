//Importando Router dentro do express
const { Router } = require('express'); 

//Importando o UsersController
const UsersController = require('../controllers/UsersController');

//Executando o Router
const usersRoutes = Router();

//Reservando espaço em memória para a classe
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);


//Exportando a váriavel usersRoutes
module.exports = usersRoutes;