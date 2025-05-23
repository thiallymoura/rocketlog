import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

// Importando o middleware de autenticação
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

// Importando o middleware de autorização
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization'

// Rotas de entregas
const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController(); //criando o controlador
// status de entregas
const deliveriesStatusController = new DeliveriesStatusController();

// Middleware de autenticação
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));
// Rotas de entregas
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);

// Rotas de status de entregas
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };