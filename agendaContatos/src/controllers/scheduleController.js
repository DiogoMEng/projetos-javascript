const Contact = require('../models/contactModel');

exports.index = async (req, res) => {
    const contacts = await new Contact(req.body).searchContact();

    res.render('schedule', { contacts });
};