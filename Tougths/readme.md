# TOUGTHS

O projeto desenvolvido duranto o cursor da <a href="https://www.udemy.com/">Udemy</a> busca
apresentar um blog onde usuários podem compartilhar seus pensamentos. A criação do projeto buscou aplicar os conceitos abordados durante o curso de NodeJS e as principais ferramentes
utilizadas em aplicações reais.

# 📚 Índice

- <a href="#️-tecnologias">🛠️ Tecnologias</a>
- <a href="#-endpoints">🔗 Endpoints</a>
- <a href="#-funcionalidades">✨ Funcionalidades</a>
- <a href="#pre-visualizacao-aplicacao">🖼️ Pré-visualização da Aplicação</a>
- <a href="#️-requisitos">⚙️ Requisitos</a>
- <a href="#-instalacao">📦 Instalação</a>
- <a href="#-configuracao">🔧 Configuração</a>
- <a href="#como-executar-o-projeto">🛠️ Como Executar o Projeto</a>
- <a href="#-licenca">📄 Licença</a>

---

# <p id="tecnologias">🛠️ Tecnologias</p>

O projeto utiliza as seguintes bibliotecas e ferramentas:

- bcryptjs 🔒 - Hashing de senhas para segurança de usuários.
- connect-flash ⚡ - Exibição de mensagens temporárias entre requisições.
- cookie-parser 🍪 - Middleware para manipulação de cookies.
- cookie-session 🍪 - Armazenamento de sessões baseadas em cookies.
- express 🚀 - Framework web minimalista para Node.js.
- express-flash ✨ - Exibir mensagens flash usando o Express.
- express-session 🛠️ - Gerenciamento de sessões de usuários.
- mysql2 🐬 - Cliente MySQL para Node.js.
- nodemon 🔁 - Ferramenta de desenvolvimento que reinicia automaticamente o servidor.
- sequelize 🗄️ - ORM para manipulação de banco de dados SQL.
- session-file-store 📁 - Armazenamento de sessões em arquivos.

---

# <p id="endpoints">🔗 Endpoints</p>

🧑‍💻 Autenticação

- `POST /api/login`: Realiza login do usuário.
- `POST /api/signup`: Cria uma nova conta de usuário.

📝 Pensamentos

- `GET /api/thoughts`: Retorna todos os pensamentos.
- `POST /api/thoughts`: Cria um novo pensamento.
- `PUT /api/thoughts/:id`: Atualiza um pensamento existente.
- `DELETE /api/thoughts/:id`: Exclui um pensamento.

💬 Comentários

- `POST /api/thoughts/:id/comments`: Adiciona um comentário a um pensamento.

---

# <p id="funcionalidades">✨ Funcionalidades</p>

- 👤 Autenticação e autorização de usuários (JWT)
- 📝 CRUD de pensamentos (criar, visualizar, atualizar e deletar)
- 💬 Comentários em pensamentos
- 🔍 Filtros e paginação para busca de pensamentos

---

# <p id="pre-visualizacao-aplicacao">🖼️ Pré-visualização da Aplicação</p>

---

# <p id="requisitos">⚙️ Requisitos</p>

Para executar este projeto, você precisará de:

- 🟢 Node.js >= 14.0
- 🐋 Docker (opcional para ambiente de desenvolvimento)
- 💾 Banco de dados MySQL

---

# <p id="instalacao">📦 Instalação</p>

Siga estas etapas para configurar o ambiente local:

```bash
# Clone o repositório
git clone https://github.com/usuario/blog-pensamentos.git

# Acesse o diretório
cd blog-pensamentos

# Instale as dependências
npm install
```

---

# <p id="configuracao">🔧 Configuração</p>

Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
DB_HOST=localhost
DB_PORT=27017
DB_NAME=blog
JWT_SECRET=sua_chave_secreta
```

---

# <p id="como-executar-o-projeto">🛠️ Como Executar o Projeto</p>

Após instalar as dependências e configurar o ambiente, execute o projeto com o comando:

```bash
# Inicie o servidor
npm start
```

O servidor estará disponível em http://localhost:3000.

---

# <p id="contribuicoes">🤝 Contribuições</p>

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
