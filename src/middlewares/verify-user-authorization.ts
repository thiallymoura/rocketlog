import { Request, Response, NextFunction } from "express";

import { AppError } from "@/utils/AppError";

// Função de middleware para verificar a autorização do usuário
function verifyUserAuthorization(role: string[]) {

    return (request: Request, response: Response, next: NextFunction) => {

        // Verifica se o usuário foi autenticado
        if (!request.user) {
            throw new AppError("Unauthorized", 401);
        }

        // Verifica se o usuário possui a permissão necessária
        if (!role.includes(request.user.role)) {
            throw new AppError("Unauthorized", 401);
        }


        // Prosseguir para o próximo middleware
        return next();
    }
}

export { verifyUserAuthorization };

