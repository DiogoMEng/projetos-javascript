import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFlashMessage from "./useFlashMessage.js";

import api from "../utils/api.js";

export default function useAuth () {

  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true);
    }
  }, [])

  async function register (user) {

    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((res) => {
        return res.data;
      });

      await authUser(data)
    } catch (err) {
      /**
       *  HANDLE ERROR 
       */
      msgText = err.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);

  }

  async function login (user) {

    let msgText = "Login realizado com sucesso";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then(res => {
        return res.data
      });

      await authUser(data);
    } catch (err) {
      msgText = err.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);

  }

  async function authUser(data) {

    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    history.push("/");

  }
  
  function logout () {

    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/");

    setFlashMessage(msgText, msgType);

  }

  return {
    authenticated,
    register,
    logout,
    login
  }

}