import { Router } from "express";

import { UsersController } from "../controllers/users-controller";

// Rotas de usuários
const usersRoutes = Router();
const usersController = new UsersController(); // Instancia o controlador de usuários

// Rotas de usuários
usersRoutes.post("/", usersController.create); // Rota de criação de usuários

export { usersRoutes };