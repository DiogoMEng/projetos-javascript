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

    let emptyToughts = true;

    if (toughts.length > 0) {
      let emptyToughts = false;
    }
 
    res.render('toughts/dashboard', { toughts, emptyToughts });

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

  static async removeTought(req, res) {

    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } })

      req.flash('message', 'Pensamento removido com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch(error) {
      console.log(error);
    }

  }

  static async updateTought (req, res) {

    const id = req.params.id;

    const tought = await Tought.findOne({ where: {
      id: id
    } });

    res.render('/toughts/edit', { tought });

  }

};