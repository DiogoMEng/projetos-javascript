# 📘 Documentação do Projeto Backend - Adotai

## 🧾 Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Scripts de Desenvolvimento](#scripts-de-desenvolvimento)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Rotas da API](#rotas-da-api)
8. [Modelos e Banco de Dados](#modelos-e-banco-de-dados)
9. [Autenticação e Autorização](#autenticação-e-autorização)
10. [Upload de Arquivos](#upload-de-arquivos)
11. [Boas Práticas e Convenções](#boas-práticas-e-convenções)
12. [FAQ / Problemas Comuns](#faq--problemas-comuns)
13. [Licença](#licença)

## 📌 Descrição do Projeto

O **Adotai** é uma API RESTful desenvolvida para facilitar o processo de adoção de animais de estimação. O sistema permite que usuários cadastrem pets para adoção, agendem visitas, gerenciem perfis e finalizem processos de adoção de forma segura e organizada.

> **Objetivo**: Conectar pessoas que desejam adotar pets com aquelas que precisam encontrar novos lares para seus animais, criando uma plataforma segura e eficiente para adoções responsáveis.

## 🧰 Tecnologias Utilizadas

- **Linguagem**: Node.js
- **Framework**: Express.js 5.1.0
- **Banco de dados**: MongoDB
- **ODM**: Mongoose 8.16.0
- **Autenticação**: JWT (jsonwebtoken 9.0.2)
- **Criptografia**: bcrypt 6.0.0
- **Upload de arquivos**: Multer 2.0.1
- **CORS**: cors 2.8.5
- **Cookies**: cookie-parser 1.4.7
- **Desenvolvimento**: Nodemon 3.1.10

## 🏗 Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)** com uma estrutura organizada:

```bash
backend/ 
├── controllers/ # Lógica de negócio e controle das rotas 
│ ├── Pet.controller.js 
│ └── User.controller.js 
├── models/ # Modelos de dados (Mongoose schemas) 
│ ├── Pet.js 
│ └── User.js 
├── routes/ # Definição das rotas da API 
│ ├── pets.route.js 
│ └── user.route.js 
├── helpers/ # Funções auxiliares 
│ ├── getToken.helper.js 
│ └── getUserByToken.helper.js 
├── db/ # Configuração do banco de dados 
│ └── conn.js 
├── public/ # Arquivos estáticos (imagens) 
├── package.json 
└── index.js # Arquivo principal da aplicação
```

## ⚙️ Instalação e Configuração

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/adotai-backend.git

# Acesse a pasta do backend
cd adotai-backend

# Instale as dependências
npm install

# Certifique-se de que o MongoDB está rodando localmente
# Padrão: mongodb://localhost:27017/adotai
```

## 📜 Scripts de Desenvolvimento

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev

# Rodar testes (não configurado ainda)
npm test
```

## 🔐 Variáveis de Ambiente

O projeto utiliza as seguintes configurações:

```bash
# Servidor
PORT=3001

# Banco de dados
MONGODB_URI=mongodb://localhost:27017/adotai

# JWT
JWT_SECRET=nossosecret

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🌐 Rotas da API

### 🐾 Pets

| Método | Endpoint                  | Descrição                      | Autenticado |
|--------|---------------------------|--------------------------------|-------------|
| POST   | `/pets`                   | Cadastrar novo pet             | ✅          |
| GET    | `/pets`                   | Listar todos os pets           | ❌          |
| GET    | `/pets/mypets`            | Listar pets do usuário logado  | ✅          |
| GET    | `/pets/myadoptions`       | Listar adoções do usuário      | ✅          |
| GET    | `/pets/:id`               | Buscar pet por ID              | ❌          |
| PATCH  | `/pets/:id`               | Atualizar dados do pet         | ✅          |
| DELETE | `/pets/:id`               | Remover pet                    | ✅          |
| PATCH  | `/pets/schedule/:id`      | Agendar visita ao pet          | ✅          |
| PATCH  | `/pets/conclude/:id`      | Finalizar adoção               | ✅          |

### 👤 Usuários

| Método | Endpoint                | Descrição                  | Autenticado |
|--------|-------------------------|----------------------------|-------------|
| POST   | `/users/register`       | Cadastrar usuário          | ❌          |
| POST   | `/users/login`          | Login do usuário           | ❌          |
| GET    | `/users/checkuser`      | Verificar usuário logado   | ✅          |
| GET    | `/users/:id`            | Buscar usuário por ID      | ❌          |
| PATCH  | `/users/edit/:id`       | Editar perfil do usuário   | ✅          |

## 🗃 Modelos e Banco de Dados

### Entidades

#### **User (Usuário)**
```javascript
{
  name: String (obrigatório),
  email: String (obrigatório),
  password: String (obrigatório),
  image: String (opcional),
  phone: String (obrigatório),
  timestamps: true
}
```

#### **Pet (Animal)**
```javascript
{
  name: String (obrigatório),
  age: Number (obrigatório),
  weight: Number (obrigatório),
  color: String (obrigatório),
  images: Array (obrigatório),
  available: Boolean,
  user: Object (dados do dono),
  adopter: Object (dados do adotante),
  timestamps: true
}
```

### Relacionamentos

- Um **Pet** pertence a um **User** (dono)
- Um **Pet** pode ter um **User** como adotante
- **User** pode ter múltiplos **Pets** cadastrados
- **User** pode adotar múltiplos **Pets**

## 🔐 Autenticação e Autorização

- **JWT Token** com secret personalizado (`nossosecret`)
- **Middleware de verificação** através dos helpers:
  - `getToken()`: Extrai token do header Authorization
  - `getUserByToken()`: Valida token e retorna dados do usuário
- **Proteção de rotas**: Endpoints sensíveis requerem autenticação
- **Autorização por propriedade**: Usuários só podem editar/remover seus próprios pets

### Fluxo de Autenticação

1. Usuário faz login com email/senha
2. Sistema retorna JWT token
3. Cliente envia token no header: `Authorization: Bearer <token>`
4. Middleware valida token em rotas protegidas

## 📁 Upload de Arquivos

- **Biblioteca**: Multer 2.0.1
- **Pasta pública**: `/public` (servida estaticamente)
- **Tipos aceitos**: Imagens para pets e perfis de usuário
- **Validação**: Obrigatório pelo menos uma imagem por pet

## 📏 Boas Práticas e Convenções

- **Estrutura MVC**: Separação clara de responsabilidades
- **Validação de dados**: Verificação obrigatória de campos
- **Tratamento de erros**: Respostas HTTP padronizadas
- **Segurança**: Senhas criptografadas com bcrypt
- **CORS configurado**: Permite requisições do frontend (localhost:3000)
- **Timestamps automáticos**: Mongoose adiciona createdAt/updatedAt

### Códigos de Status HTTP

- `200`: Sucesso
- `201`: Criado com sucesso
- `401`: Não autorizado
- `404`: Não encontrado
- `422`: Dados inválidos
- `500`: Erro interno do servidor

## ❓ FAQ / Problemas Comuns

### Erro: "Conectou ao Mongoose!" não aparece
**Solução**: Verifique se o MongoDB está rodando na porta 27017

### Erro: "Acesso Negado"
**Solução**: Confirme se está enviando o header `Authorization: Bearer <token>`

### Erro: "ID inválido"
**Solução**: Certifique-se de que está enviando um ObjectId válido do MongoDB

### Erro: CORS
**Solução**: Verifique se o frontend está rodando em `http://localhost:3000`

### Erro: "A imagem é obrigatória!"
**Solução**: Envie pelo menos uma imagem no campo `images` via multipart/form-data

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Consulte o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para facilitar adoções responsáveis de pets**
