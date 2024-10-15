const Contact = require('../models/contactModel');

exports.index = function(req, res){
    res.render('contact', {
        contact: {}
    })
};

exports.register = async function(req, res) {
    try {
        const contact = new Contact(req.body);
        await contact.register();
        
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(`/schedule`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('E404')
    }
};

exports.editIndex = async function(req, res) {
    const contact = new Contact(req.body);
    
    if(!req.params.id) return res.render('E404');

    const user = await contact.searchID(req.params.id)

    if(user) {
        res.render('contact', {
            contact: user
        });
    } else {
        res.render('E404');
    }

};

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('E404');

        const contact = new Contact(req.body);

        await contact.edit(req.params.id);

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso');
        req.session.save(() => res.redirect(`/schedule`));
        return;   
    } catch (e) {
        console.log(e);
        res.render('E404');
    }
}

exports.delete = async function(req, res) {
    const contact = new Contact(req.body);
    
    if(!req.params.id) return res.render('E404');

    const user = await contact.delete(req.params.id)
    
    if(!user) return res.render('E404');

    req.flash('success', 'Contato apagado com sucesso');
    req.session.save(() => res.redirect('/schedule'));
    return;
};