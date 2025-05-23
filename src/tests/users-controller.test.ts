import request from "supertest";
import { prisma } from "@/database/prisma";


import { app } from "../app";

// Teste de criação de usuários
describe("UsersController", () => {
    let user_id: string;

    // Deleta o usuario depois de fazer o teste
    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
    })

    // Criação de usuários
    it("should create a new user sucessfully", async () => {

        // fazendo a requisição
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testeuser@example.com",
            password: "password123456"
        })

        // validando
        expect(response.status).toBe(201); //valida se tem status 201
        expect(response.body).toHaveProperty("id"); //valida se tem propriedade id
        expect(response.body.name).toBe("Test User"); //valida se tem propriedade name

        user_id = response.body.id //pegando o id do usuario criado
    })

    // Deve lançar um erro se o usuário com o mesmo e-mail já existir
    it("should thow an error if user widt same email already exists", async () => {

        // fazendo a requisição
        const response = await request(app).post("/users").send({
            name: "Duplicate User",
            email: "testeuser@example.com",
            password: "password123456"
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User with same email already exists");
    })

    //  verifica se um e-mail inválido gera um erro de validação
    it("should throw a validation error if email is invalid", async () => {

        // fazendo a requisição
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "invalid-email",
            password: "password123456"
        })

        expect(response.status).toBe(400); //valida se tem status 400
        expect(response.body.message).toBe("validation error"); //messagem de erro
    })
});