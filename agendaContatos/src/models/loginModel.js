const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    contact: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async userAccount (){
        this.validaUserAccount();

        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({
            email: this.body.email
        })

        if(!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        };

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
        }
    }

    async register(){
        this.validaRegister();

        if(this.errors.length > 0) return;

        await this.userExists();

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);   
    }

    async userExists() {
        this.user = await LoginModel.findOne({
            username: this.body.username,
            email: this.body.email
        })

        if(this.user) this.errors.push('Usuário já existe.');
    }

    validaRegister(){
        this.cleanUp();

        const regex = /^91[9][8-9][0-9]{7}$/;

        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido')
        };

        if(!regex.test(this.body.contact)) {
            this.errors.push('Número inválido.');
        }

        if(this.body.password.length < 3 || this.body.password.length >= 50) {
            this.errors.push('A senha precisa ter entre 3 à 50 caracteres');
        }
    }

    validaUserAccount(){
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido')
        };

        if(this.body.password.length < 3 || this.body.password.length >= 50) {
            this.errors.push('A senha precisa ter entre 3 à 50 caracteres');
        }
    }

    cleanUp() {
        for(const key in this.body) {
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        }
    
        this.body = {
            fullname: this.body.fullname,
            username: this.body.username,
            contact: this.body.contact,
            email: this.body.email,
            password: this.body.password
        };
    }

}

module.exports = Login;