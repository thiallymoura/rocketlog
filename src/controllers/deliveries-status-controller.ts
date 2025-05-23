import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

// Controlador status de entregas
class DeliveriesStatusController {
    // Método de criação de entregas
    async update(request: Request, response: Response, next: NextFunction) {

        // especifica o formato dos parâmetros da requisição
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        // especifica o formato do corpo da requisição
        const bodySchema = z.object({
            status: z.enum(["proccessing", "shipped", "delivered"]),
        });

        // Extrai os dados do corpo e dos parâmetros da requisição e valida
        const { id } = paramsSchema.parse(request.params);
        const { status } = bodySchema.parse(request.body);

        // Atualiza o status da entrega no banco de dados
        await prisma.delivery.update({
            data: { status },
            where: { id }
        });

        // Cria um log de entrega no banco de dados
        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: status,
            }
        });

        return response.json();
    }
}

export { DeliveriesStatusController };