// Define a classe AppError, usada para representar erros personalizados
class AppError {
    // Define as propriedades da classe: uma mensagem e um código de status HTTP
    message: string;
    statusCode: number;

    // Construtor que recebe a mensagem do erro e o status HTTP (valor padrão 400)
    constructor(message: string, status: number = 400) {
        this.message = message;
        this.statusCode = status; // Define o status HTTP, 400 por padrão
    }
}

export { AppError }