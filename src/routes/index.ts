import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes";

// Rotas
const routes = Router();

// Rotas de usuários
routes.use("/users", usersRoutes);
// Rotas de sessões
routes.use("/sessions", sessionsRoutes);
// Rotas de entregas
routes.use("/deliveries", deliveriesRoutes);
// Rotas de logs de entregas
routes.use("/delivery-logs", deliveryLogsRoutes);


export { routes };