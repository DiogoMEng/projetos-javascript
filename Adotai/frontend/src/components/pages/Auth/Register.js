import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css"

/**
 *  CONTEXTS 
 */
import { Context } from "../../../context/UserContext";

function Register() {

  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange (event) {
    setUser({ ...user, [event.target.name]: event.target.value} )
  }

  function handleSubmit (event) {
    event.preventDefault();
    register(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input 
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu Telefone"
          handleOnChange={handleChange}
        />
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu E-mail"
          handleOnChange={handleChange}
        />
        <Input 
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua Senha"
          handleOnChange={handleChange}
        />
        <Input 
          text="Confirmação de Senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar "/>
      </form>
      <p>Já tem Conta? <Link to="/login">Clique Aqui.</Link> </p>
    </section>
  )

}

export default Register;