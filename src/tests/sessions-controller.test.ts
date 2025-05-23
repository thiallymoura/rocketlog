import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "../app";

describe("SessionsController", () => {

    let user_id: string;

    // Deleta o usuario depois de fazer o teste
    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
    })

    // deve autenticar um usuário e obter um token
    it("should authenticate a and get access token", async () => {

        // fazendo a requisição
        const userResponse = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "authtesteuser@example.com",
            password: "password123456"
        })

        user_id = userResponse.body.id //pegando o id do usuario criado

        const sessionResponse = await request(app).post("/sessions").send({
            email: "authtesteuser@example.com",
            password: "password123456"
        })

        expect(sessionResponse.status).toBe(200); //valida se tem status 200
        expect(sessionResponse.body.token).toEqual(expect.any(String)); //valida se tem propriedade token e se é um string
    })
})