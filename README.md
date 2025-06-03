# 🚚 API de Entregas

Este projeto é uma **API de entregas** desenvolvida durante o curso Fullstack. 
A API permite que usuários (vendedores e clientes) gerenciem pedidos, acompanhem o status das entregas em tempo real e tenham diferentes níveis de acesso.

---

## ✨ Funcionalidades

- Perfis de usuário com níveis de acesso: **vendedor** e **cliente**.
  
- Envio de pedidos e gerenciamento dos status:
  - Processando
  - Enviado
  - Entregue
    
- Registro das movimentações da entrega para acompanhamento em tempo real.
- Validação de dados usando **Zod**.
- Persistência de dados com **PostgreSQL** gerenciado pelo **Prisma**.
- Containerização da aplicação e banco de dados usando **Docker**.
- Deploy da aplicação em servidor para acesso público usando o **Render**.

---

## 🔐 Autenticação e Autorização

- Implementação de autenticação para garantir que apenas usuários cadastrados possam acessar a API.
- Controle de autorização para diferenciar permissões entre perfis de **vendedor** e **cliente**, garantindo que cada um tenha acesso somente às funcionalidades que lhe são permitidas.

---

## 🧪 Testes Automatizados

- Testes escritos com **Jest** para garantir o funcionamento correto dos endpoints e regras de negócio.
- Execução dos testes em modo watch para facilitar o desenvolvimento e garantir a qualidade do código.


## 🛠️ Tecnologias utilizadas

- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod (validação)
- Docker
- Jest (testes)

---

## 🚀 Como rodar o projeto localmente


## ⚙️ Instalação

1. Clone o repositório 🖥️:

   ```sh
   git clone https://github.com/thiallymoura/rocketlog.git
   ```
   
2. Instale as dependências 📦:

   ```sh
   npm install
   ```

3. Inicie os containers da aplicação e do banco de dados 🐳:
   
   ```sh
   docker-compose up -d
   ```

## 🔧 Configuração

1. Crie o arquivo .env na raiz do projeto, seguindo o modelo disponível no arquivo .env-example:

   ```sh
   copy .env-example .env
   ```

### 🚧 Desenvolvimento

Iniciar a aplicação em modo desenvolvimento 

```sh
npm run dev
```

### 🚀 Produção

Para construir e iniciar o servidor em modo de produção:

```sh
npm run build
npm start
```

Para Executar os testes 🛠️:

```sh
npm run test:dev
```
         
