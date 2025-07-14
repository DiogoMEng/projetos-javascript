import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

/**
 *  COMPONENTS 
 */
import Navbar from "./components/layouts/Navbar";
import Footer  from "./components/layouts/Footer";
import Container from "./components/layouts/Container";


/**
 *  PAGES 
 */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";

/**
 *  CONTEXT 
 */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
