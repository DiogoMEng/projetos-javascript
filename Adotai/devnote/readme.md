# <p id="sumario">SUMÁRIO</p>

PARTE 1: <a href="#estrutura-projeto" style="font-weight: bold">Estrutura do Projeto</a>

PARTE 2: <a href="#user-controller" style="font-weight: bold">User Controller</a>

- <a href="#resgate-user-id">Resgatando usuário por ID</a>
- <a href="#atualiza-user-id">Atualizando usuário por ID</a>

PARTE 3: <a href="#helpers" style="font-weight: bold">Helpers</a>

- <a href="#image-upload">Image Upload</a>

PARTE 4: <a href="#pet-controller" style="font-weight: bold">Pet Controller</a>

- <a href="#get-all">Get All</a>

INFORMAÇÕES EXTRAS: <a href="#problemas-desenvolvimento" style="font-weight: bold">Solução Problemas ao Desenvolver</a>

- <a href="#porta-nao-responde">Porta não Responde</a>

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

<a href="#sumario">--SUMÁRIO--</a>

---

# <p id="user-controller">User Controller</p>

## <p id="resgate-user-id">Resgatando usuário por ID</p>

```javascript
  static async getUserById(req, res) {

    const { id } = req.params;

    /**
     *  SELECT() - remove campos que não são necessários no retorno
     */
    const user = await User.findById(id).select("-password");

    if(!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });

  }
```

## <p id="atualiza-user-id">Atualizando usuário por ID</p>

```javascript
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id }, // filtro para atualização
        { $set: user }, // informa os dados que serão atualizados
        { new: true } // permite a atualização dos dados
      )
```

<a href="#sumario">--SUMÁRIO--</a>

---

# <p id="helpers">Helpers</p>

## <p id="image-upload">Image Upload</p>

```javascript
/**
 *  CONFIGURAÇÃO MULTER 
 */
const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {

    let folder = "";
    
    if(req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);

  },
  filename: function(req, file, cb) {

    cb(null, Date.now() + path.extname(file.originalname))

  }
});

/**
 *  UPLOAD DE IMAGEM 
 */
const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas jpg ou png!"));
    }
    cb(undefined, true);
  }
});
```

_Nota: o multer irá pegar a pasta que vem pela requisição, e envia para uma pasta._

<a href="#sumario">--SUMÁRIO--</a>

---

# <p id="pet-controller">Pet Controller</p>

## <p id="get-all">Get All</p>

```javascript
static async getAll(req, res) {

  /**
   *  RETORNA OS DADOS EM ORDEM CRESCENTE
   *  - Mais novo --> Mais Velho 
   */
  const pets = await Pet.find().sort("-createdAt")

}
```

<a href="#sumario">--SUMÁRIO--</a>

---

# <p id="problemas-desenvolvimento">Solução Problemas ao Desenvolver</p>

## <p id="porta-nao-responde">Porta não Responde</p>

```bash
# ctrl+alt+t --> Abrir terminal

# --> mostra tudo que esta rodando na porta
sudo lsof -i :3001

#RETORNA
# node    PID  <user>   21u  IPv6  ...  TCP *:3001 (LISTEN)

# --> Finaliza qualquer processo na porta
sudo kill -9 PID
```