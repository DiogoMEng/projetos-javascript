import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../form/Input";

import styles from "../../form/Form.module.css";

/**
 *  CONTEXT 
 */
import { Context } from "../../../context/UserContext";

function Login() {

  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value} );
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input 
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar"></input>
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )

}

export default Login;