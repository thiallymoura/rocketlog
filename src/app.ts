import express from "express"
import "express-async-errors"

import { routes } from "./routes"

// importando o middleware
import { errorHandling } from "./middlewares/error-handling"

// inicializando o express
const app = express();

app.use(express.json());
// adicionando as rotas
app.use(routes);

// adicionando o middleware de tratamento de erros
app.use(errorHandling);

export { app };