import { useState, useContext } from "react";
import Input from "../../form/Input";

import styles from "../../form/Form.module.css";

/**
 *  CONTEXT 
 */
import { Context } from "../../../context/UserContext";

function Login() {
  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form>
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
        />
      </form>
    </section>
  )
}

export default Login;