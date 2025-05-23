import { PrismaClient } from "@prisma/client";

// conectando com o banco
export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"], // Desativa o log de consultas no ambiente de produção
});