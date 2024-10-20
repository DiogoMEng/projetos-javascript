const Tought = require("../models/Tougth.js");
const User = require("../models/User.js");

module.exports = class ToughController {
  static async showToughts(req, res) {
    res.render('toughts/home')
  }

  static async dashboard(req, res) {
    res.render('toughts/dashboard');
  }
};