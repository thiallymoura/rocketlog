import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

// Controlador de logs de entregas
class DeliveryLogsController {
    // Método de criação de logs de entregas
    async create(request: Request, response: Response, next: NextFunction) {
        // especifica o formato do corpo da requisição
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        });

        // Extrai os dados do corpo da requisição e valida
        const { delivery_id, description } = bodySchema.parse(request.body);

        // Verifica se a entrega existe no banco de dados
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        });

        // Verifica se a entrega foi encontrada
        if (!delivery) {
            throw new AppError("Delivery not found", 404)
        }

        // Verifica se o status da entrega é delivered, se for, retorna um erro
        if (delivery.status === "delivered") {
            throw new AppError("this order has already been delivered", 400)
        }

        // Verifica se o status da entrega é proccessing
        if (delivery.status === "proccessing") {
            throw new AppError("change status to shipped") // Altera o status da entrega para shipped
        }

        // Cria o log de entrega no banco de dados
        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        });

        return response.status(201).json();
    }

    //Visualizar detalhes do pedido 
    async show(request: Request, response: Response, next: NextFunction) {

        // especifica o formato dos parâmetros da requisição
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        });

        // Extrai os dados dos parâmetros da requisição e valida
        const { delivery_id } = paramsSchema.parse(request.params);

        // Busca a entrega no banco de dados
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                user: true,
                logs: true // logs: { select: { description: true, id: true }},

            }
        });

        // Verifica se a entrega foi encontrada
        if (!delivery) {
            return response.status(404).json({ message: "Delivery not found" });
        }

        // se o usuario é um cliente e o id do usuario for diferente do id da entrega 
        if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("The user can only view their own deliveries", 401); //usuario só pode ver seus pedidos
        }

        return response.status(200).json(delivery);

    }
}
export { DeliveryLogsController };