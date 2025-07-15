import { createContext } from "react";
import useAuth from "../hooks/useAuth.js";

const Context = createContext();

function UserProvider({children}) {

  const { authenticated, register, logout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, logout }}>
      {children}
    </Context.Provider>
  )

}

export { Context, UserProvider };