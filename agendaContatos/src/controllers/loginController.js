const Login = require("../models/loginModel");

exports.index = (req, res) => {
    if(req.session.user) return res.render('logged')
    res.render('login')
};

exports.register = async function(req, res) {
    try {
      const login = new Login(req.body);
      await login.register();

      if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
          return res.redirect('/login');
        });
        return;
      }
      
      req.flash('success', 'Usuário criado com sucesso');
      req.session.save(function() {
        return res.redirect('/login');
      });
    } catch (e) {
      console.log(e)
      return res.render('E404');
    }
};

exports.userAccount = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.userAccount();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login');
      });
      return;
    }
    
    req.flash('success', 'Você entrou no sistema');
    req.session.user = login.user;
    req.session.save(function() {
      return res.redirect('/login');
    });
  } catch (e) {
    console.log(e)
    return res.render('E404');
  }
};

exports.logout = async function(req, res) {
  req.session.destroy();
  res.redirect('/')
};