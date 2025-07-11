import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import Logo from "../../assets/img/logo.png"

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <div className={styles.navbar_logo}>
          <img src={Logo} alt="Adotaí"></img>
          <h2>Adotaí</h2>
        </div>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;