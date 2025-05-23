import { Request, Response, NextFunction } from "express";
import { authConfig } from "../config/auth";
import { AppError } from "../utils/AppError";
import { verify } from "jsonwebtoken";

// interface para tipagem do payload
interface TokenPayload {
    role: string;
    sub: string;
}

// middleware de autenticação
function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // verificar se o token é valido
    try {
        // pegar o token
        const authHeader = request.headers.authorization;

        // verificar se o token existe
        if (!authHeader) {
            throw new AppError("JWT token not found", 401);
        }

        // se o token for informado usar o split para pegar apenas o token
        const [, token] = authHeader.split(" ");
        // verificar se o token é valido

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

        // adicionar o id do usuário na requisição
        request.user = {
            id: user_id,
            role
        };

        // prosseguir para o próximo middleware
        return next();
    } catch {
        throw new AppError("Invalid JWT token", 401);
    }
}

export { ensureAuthenticated };