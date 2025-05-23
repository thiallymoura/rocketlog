import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

// Controlador de sessões
class SessionsController {
    // Método de criação de sessão de usuários
    async create(request: Request, response: Response, next: NextFunction) {
        // especifica o formato do corpo da requisição
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        // Extrai os dados do corpo da requisição e valida
        const { email, password } = bodySchema.parse(request.body);

        // Busca o primeiro usuário no banco de dados que tenha o e-mail fornecido
        const user = await prisma.user.findFirst({
            where: { email },
        });

        // Verifica se o usuário foi encontrado
        if (!user) { //
            throw new AppError("Invalid email or password", 401);
        }

        // Compara a senha informada pelo usuário com a senha criptografada salva no banco de dados
        const passwordMatched = await compare(password, user.password);

        // Verifica se as senhas não coincidem
        if (!passwordMatched) {
            throw new AppError("Invalid email or password", 401);
        }

        // recupera as configurações de autenticação
        const { secret, expiresIn } = authConfig.jwt;

        // Gera o token JWT
        const token = sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        });

        // Remove a senha do usuário e retorna o token
        const { password: hashedPassword, ...userWithoutPassword } = user;

        return response.json({ token, ...userWithoutPassword });
    }
}

export { SessionsController };