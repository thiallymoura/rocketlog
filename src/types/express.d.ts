// Tipagem para o Express
declare namespace Express {
    export interface Request {
        user?: {
            id: string
            role: string
        };
    }
}