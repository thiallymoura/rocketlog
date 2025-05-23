import { z } from "zod";

// Valida as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),

});

export const env = envSchema.parse(process.env);