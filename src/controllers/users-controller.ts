import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { z } from "zod";

// Controlador de usuários
class UsersController {
    // Método de criação de usuários
    async create(request: Request, response: Response, next: NextFunction) {

        // especifica o formato do corpo da requisição
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6),
        });

        // Extrai os dados do corpo da requisição e valida
        const { name, email, password } = bodySchema.parse(request.body);

        // procura no banco de dados o primeiro usuário que tenha o mesmo e-mail informado
        const userWithSameEmail = await prisma.user.findFirst({
            where: { email },
        });

        // Verifica se o usuário com o mesmo email ja existe
        if (userWithSameEmail) {
            throw new AppError("User with same email already exists");
        }

        // Gera a criptografia do password
        const hashedPassword = await hash(password, 8);

        // Cria o usuário no banco de dados
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // Senha criptografada
            },
        });

        // Remove a senha do usuário do banco de dados
        const { password: _, ...userWithoutPassword } = user;

        return response.status(201).json(userWithoutPassword);
    }
}


export { UsersController };