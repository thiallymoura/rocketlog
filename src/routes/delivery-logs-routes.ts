import { Router } from "express";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; // Importando o middleware de autenticação
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"; // Importando o middleware de autorização

// Importando o controlador de logs de entregas
import { DeliveryLogsController } from "../controllers/delivery-logs-controller";

// Rotas de logs de entregas
const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController(); // Instancia o controlador de logs de entregas

// Criando o log de entrega
deliveryLogsRoutes.post(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create
);

// visualizar detalhes do pedido
deliveryLogsRoutes.get(
    "/:delivery_id/show",
    ensureAuthenticated,
    verifyUserAuthorization(["sale", "customer"]), //vendedor e cliente podem visualizar o pedido
    deliveryLogsController.show
);

export { deliveryLogsRoutes };