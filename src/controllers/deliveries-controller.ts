import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

// Controlador de entregas
class DeliveriesController {

    // Método de criação de entregas
    async create(request: Request, response: Response, next: NextFunction) {

        // especifica o formato do corpo da requisição
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        });

        // Extrai os dados do corpo da requisição e valida
        const { user_id, description } = bodySchema.parse(request.body);

        // Cria a entrega no banco de dados
        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        });

        return response.status(201).json();
    }

    // Método de listagem de entregas
    async index(request: Request, response: Response, next: NextFunction) {

        // Busca todas as entregas no banco de dados
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        return response.status(200).json(deliveries);
    }
}

export { DeliveriesController };