# <p id="sumario">SUMÁRIO</p>

PARTE 1: <a href="#backend" style="font-weight: bold">Back-End do Projeto</a>

- <a href="#estrutura-projeto" style="font-weight: bold">Estrutura do Projeto</a>
- <a href="#user-controller" style="font-weight: bold">User Controller</a>
  1. <a href="#resgate-user-id">Resgatando usuário por ID</a>
  2. <a href="#atualiza-user-id">Atualizando usuário por ID</a>
- <a href="#helpers" style="font-weight: bold">Helpers</a>
  1. <a href="#image-upload">Image Upload</a>
- <a href="#pet-controller" style="font-weight: bold">Pet Controller</a>
  1. <a href="#get-all">Get All</a>

PARTE 2: <a href="#frontent" style="font-weight: bold">Front-End do Projeto</a>

PARTE 3: <a href="#problemas-desenvolvimento" style="font-weight: bold">Solução Problemas ao Desenvolver</a>

- <a href="#porta-nao-responde" style="font-weight: bold">Porta não Responde</a>



---

# <p id="backend">Back-End do Projeto</p>

## <p id="estrutura-projeto">Estrutura do Projeto</p>

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

## <p id="user-controller">User Controller</p>

### <p id="resgate-user-id">Resgatando usuário por ID</p>

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

### <p id="atualiza-user-id">Atualizando usuário por ID</p>

```javascript
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id }, // filtro para atualização
        { $set: user }, // informa os dados que serão atualizados
        { new: true } // permite a atualização dos dados
      )
```

<a href="#sumario">--SUMÁRIO--</a>

---

## <p id="helpers">Helpers</p>

### <p id="image-upload">Image Upload</p>

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

## <p id="pet-controller">Pet Controller</p>

### <p id="get-all">Get All</p>

```javascript
static async getAll(req, res) {

  /**
   *  RETORNA OS DADOS EM ORDEM CRESCENTE
   *  - Mais novo --> Mais Velho 
   */
  const pets = await Pet.find().sort("-createdAt")

}
```

```javascript
  /**
   *  MÉTODO DE VERIFICAR SE OS VALORES SÃO IGUAIS 
   */
  if(pet.user._id.equals(user._id)) {
    res.status(422).json({ message: "Houve um problema em processar a sua solicitação, tente novamente mais tarde" });
    return;
  }
```

<a href="#sumario">--SUMÁRIO--</a>

---

# <p id="frontent">Front-End do Projeto</p>

```bash
# INICIA A APLICAÇÃO
npx create-react-app
```

## <p id="formulário">Formulários</p>

```javascript
/**
 *  RECEBE INPUT DE FORMA DINÂMICA 
 */
function Input ({type, text, name, placeholder, handleOnChange, value, multiple}) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <input 
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder} 
        onChange={handleOnChange} 
        value={value}
        /**
         *  RECEBE UM OU MAIS ARQUIVOS DE IMAGEM
         * --> Verifica a quantidade de arquivos enviados 
         */
        {...(multiple ? {multiple} : "")}
      ></input>
    </div>
  )
}
```

```javascript
  function setFlashMessage(msg, type) {
    /**
     *  CAPTO O EVENTO FLASH PARA PODER EXIBIR A MENSAGEM 
     */
    bus.emit("flash", {
      message: msg,
      type: type
    });

  }
```

**`useEffect`** - permite observar o evento apenas uma vez quando o componente é renderizado.

```javascript
/**
 *  AO ENVIAR UMA REQUISIÇÃO COM A API, O USUÁRIO PODERÁ SER AUTENTICADO 
 */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true);
    }
  }, [])

/**
 *  PERMITE QUE O USUÁRIO ESTEJA AUTENTICADO NA APLICAÇÃO 
 */
  async function authUser(data) {

    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    history.push("/");

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

<a href="#sumario">--SUMÁRIO--</a>