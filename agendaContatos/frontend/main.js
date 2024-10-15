import 'core-js/stable';
import 'regenerator-runtime/runtime';

// ### VALIDAÇÃO ###
import Login from './modules/login';

const register = new Login('.form-register');
const login = new Login('.form-userAccount');

register.init();
login.init();