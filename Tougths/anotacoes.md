# Pendências de Projeto

- bcryptjs: irá gerar senhas criptografadas.
- connect-flash: utilizado para gerar flash messages.
- cookie-parse e cookie-session: mantém uma sessão na máquina do cliente, além de ajudar o pro
  grama a ententer que o usuário está logado.
- express.
- express-flash: utilizado para gerar flash messages.
- express-session: ajuda na autenticação mais simples do express.
- mysql2: para trabalhar com o banco de dados.
- sequelize: para modelagem de dados.
- nodemon: mantém o servidor sempre ativo.
- session-file-store: salva as sessões em arquivos.
- handlebars: serve para montar a estrutura de pastas.

# Estrutura da Pastas

```bash
|-- src
|   |-- controllers
|   |-- db
|   |-- models
|   |-- middlewares
|   |-- public
|   |   |-- css
|   |-- views
|   |   |-- layouts
|   |-- routes
|   |-- sessions
|   |-- index.js
|-- readme.md
|-- package.json
```

# Session Middleware

Informa onde as sessões devem ser salvas pelo express.

```bash
app.use(session({
  name: "session", // nome da sessão
  secret: "nosso_secret", // ajuda na proteção das sessões dos usuários
  resave: false, // se cair a sessão ele desconecta
  saveUninitialized: false, 
  store: new FileStore({ // informa o local de salvamento
    logFn: function() {},
    path: require('path').resolve(__dirname, "sessions"); // caminho para pasta session
  }),
  cookie: {
    secure: false,
    maxAge: 360000, // tempo de duração
    expires: new Date(Date.now() + 360000), // força a expiração do cookie
    httpOnly: true
  }
}));
```

## Configuração de session como resposta

```bash
const verifySession = (req, res, next) => {
  
  // verifica se usuário possui uma session
  if (req.session.userid) {
    // retorna o id do usuário em todas as requisições de respostas
    res.locals.session = req.session;
  }

  next();

}
```
- caso o usuário esteja logado, os dados do usuário serão enviados na resposta.
- os dados do usuário serão persistidos durante a sessão.

Exemplo: cria uma sessão para o usuário após ser logado.

```bash
req.session.userid = user.id;

req.flash('message', 'Cadastro Realizado com Sucesso');

req.session.save(() => {
  res.redirect('/');
})
```
- a partir desse momento a sessão do usuário será persistida no sistema.
- `session.destroy`: usado para finalizar uma sessão.

# Flash Messages

```bash
if(password !== confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');

      return;
    }
```
- sintaxe: `flash(chave, valor)` = `req.flash('message', 'As senhas não conferem, tente novamente!')`.
- objeto será enviado ao frontend.

Exemplo: apresentação mensagem no front.
```bash
{{#if messages.message}}
  {{messages.message}}
{{/if}}
```
- messages: objeto liberado pelo flash messages para ser acessado no front.

# Criptografia

`salt  = bcrypt.genSaltSync(10)`: útil para deixar as senhas de usuários mais seguras.

`hashedPassword = bcrypt.hashSync(password_user, salt)`: gera a senha criptografada.