const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * HELPERS 
 */
const createUserToken = require("../helpers/createUserToken.helper.js");
const getToken = require("../helpers/getToken.helper.js");
const getUserByToken = require("../helpers/getUserByToken.helper.js");

module.exports = class UserController {

  static async register(req, res) {

    const { 
      name, email, password, confirmPassword, image, phone
    } = req.body;

    /**
     * VALIDATIONS
     */
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatório" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas precisam ser iguais" });
      return;
    }

    if (!image) {
      res.status(422).json({ message: "A imagem é obrigatório" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    /**
     * CHECK IF USER EXISTS 
     */
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Este e-mail já está cadastrado. Por favor, utilize outro e-mail" });
      return;
    }

    /**
     * CREATE PASSWORD 
     */
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    /**
     *  CREATE USER 
     */
    const user = new User({
      name, email, password: passwordHash, image, phone
    })

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res)
    } catch (err) {
      res.status(500).json({ message: error });
    }

  }

  static async login(req, res) {

    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }

    /**
    * CHECK IF USER EXISTS 
    */
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({ message: "Não há usuário cadastrado com este e-mail" });
      return;
    }

    /**
     * CHECK IF PASSWORD MATCH WITH DB PASSWORD
     */
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      res.status(422).json({ message: "Senha inválida" });
      return;
    }

    await createUserToken(user, req, res)

  }

  static async checkUser(req, res) {

    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);

  }

  static async getUserById(req, res) {

    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if(!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });

  }

  static async editUser(req, res) {

    const { id } = req.params;
    const { 
      name, 
      email, 
      password, 
      confirmPassword,
      phone
    } = req.body;
    let image = "";

    /**
     * CHECK IF USER EXISTS 
     */
    const token = getToken(req);
    const user = await getUserByToken(token);
    const userExists = await User.findOne({ email });

    /**
     *  VALIDATIONS 
     */
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    /**
     *  CHECK IF EMAIL HAS ALREADY TAKEN 
     */
    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }

    if (!confirmPassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatório" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ message: "As senhas precisam ser iguais" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

  }

}