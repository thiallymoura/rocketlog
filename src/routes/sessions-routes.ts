import { Router } from "express";

import { SessionsController } from "../controllers/sessions-controller";

// Inicializa o controlador de sessões
const sessionsRoutes = Router();

const sessionsController = new SessionsController(); // Instancia o controlador de sessões 

// Rotas de sessões
sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };