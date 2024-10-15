const Tought = require("../models/Tougth.js");
const User = require("../models/User.js");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.render('toughts/home')
  }
};