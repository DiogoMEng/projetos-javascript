const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

module.exports = class AuthController {

  static login(req, res) {

    res.render('auth/login');

  }

  static register(req, res) {

    res.render('auth/register');

  }

  static async registerPost(req, res){

    const { name, email, password, confirmpassword } =  req.body;

    if(password !== confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');

      return;
    }

    const checkIfUserExists

  }

}