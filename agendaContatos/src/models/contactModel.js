const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email:  { type: String, required: false, default: '' },
    contact:  { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async searchID(id) {
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findById(id);

        return contact;
    }

    async searchContact() {
        const contacts = await ContactModel.find().sort({createdIn: -1});

        return contacts;
    }

    async delete(id) {
        if(typeof id !== 'string') return;

        const contact = await ContactModel.findOneAndDelete({ _id: id });

        return contact;
    }

    async register () {
        this.valida();

        if(this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body)
    }

    valida(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido')
        };

        if(!this.body.firstName) this.errors.push('Nome é um campo obrigatório.');

        if(!this.body.email && !this.body.contact) this.errors.push('Pelo menos um contato deve ser enviado: email ou telefone');
    }

    cleanUp() {
        for(const key in this.body) {
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        }
    
        this.body = {
          firstName: this.body.firstName,
          lastName: this.body.lastName,
          email: this.body.email,
          contact: this.body.contact,
        };
    }

    async edit(id) {
        if(typeof id !== 'string') return;

        this.valida();

        if(this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }
}

module.exports = Contact;