import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Importa a classe de erro personalizada AppError
import { AppError } from "@/utils/AppError";


// Função de middleware para tratamento de erros no Express
export function errorHandling(error: Error, request: Request, response: Response, next: NextFunction) {
    // Verifica se o erro é uma instância de AppError (erro conhecido e tratado)
    if (error instanceof AppError) {
        // Retorna a resposta com o status e mensagem definidos no AppError
        return response.status(error.statusCode).json({ message: error.message });
    }

    // Verifica se o erro é uma instância de ZodError (erro de validação de dados)
    if (error instanceof ZodError) {
        // Retorna a resposta com o status 400 (bad request) e a mensagem de erro de validação
        return response.status(400).json({ message: "validation error", issues: error.format() });
    }

    // Se não for um AppError, trata como erro genérico (erro interno do servidor)
    return response.status(500).json({ message: error.message });
}
