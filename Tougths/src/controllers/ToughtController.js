const Tought = require("../models/Tougth.js");
const User = require("../models/User.js");

module.exports = class ToughController {
  
  static async showToughts(req, res) {
    
    res.render('toughts/home')

  }

  static async dashboard(req, res) {

    const userId = req.session.userid;

    const user = await User.findOne({ 
      where: { 
        id: userId 
      },
      include: Tought,
      plain: true
    });

    if(!user) res.redirect('/login');

    const toughts = user.Toughts.map((result) => result.dataValues);

    console.log(toughts);
 
    res.render('toughts/dashboard');

  }

  static async createTought(req, res) {
    
    res.render('toughts/create')

  }

  static async createToughtSave(req, res) {
    
    const tought = {
      title: req.body.title,
      UserId: req.session.userid
    }

    await Tought.create(tought);

    try {
      req.flash('message', 'Pensamento criado com sucesso!');
      
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(error);
    }

  }

};