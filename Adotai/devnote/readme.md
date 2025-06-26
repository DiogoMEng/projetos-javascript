# <p id="sumario">SUMÁRIO</p>

PARTE 1: <a href="#estrutura-projeto" style="font-weight: bold">Estrutura do Projeto</a>

---

# <p id="estrutura-projeto">Estrutura do Projeto</p>

|                    |                                                                                                                            |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|
| **controllers 📋** | Contém a lógica de negócio da aplicação, Processa requisições HTTP e coordena respostas e Faz a ponte entre models e views |
| **db 🗄️**          | Configurações e conexões com banco de dados, Scripts de migração e seeds e Arquivos de configuração do banco               |
| **helpers 🛠️**     | Funções utilitárias reutilizáveis, Código auxiliar usado em várias partes do projeto e Formatadores, validadores, etc.     |
| **models 📊**      | Define estrutura e regras dos dados, Representa tabelas/entidades do banco e Contém validações e relacionamentos           |
| **public 🌐**      | Arquivos estáticos acessíveis publicamente, CSS, JavaScript, imagens, fontes e Conteúdo servido diretamente pelo servidor  |
| **routes 🛣️**      | Define as rotas/endpoints da aplicação, Mapeia URLs para controllers específicos e Organiza navegação da aplicação         |
| **views 👁️**       | Templates e interfaces visuais, HTML, templates engines (EJS, Handlebars, etc.) e Apresentação dos dados ao usuário        |