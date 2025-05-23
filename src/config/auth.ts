import { env } from "../env";

// Configuracoes de autenticacao
export const authConfig = {
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: '1d',
    },
};