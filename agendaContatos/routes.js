const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const scheduleController = require('./src/controllers/scheduleController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController')

const { loginRequired } = require('./src/middleware/middlewares');

// home route
route.get('/', homeController.index)

// login route
route.get('/login/', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/userAccount', loginController.userAccount);
route.get('/login/logout', loginController.logout);

// schedule route
route.get('/schedule', loginRequired, scheduleController.index);

// contact route
route.get('/contact', loginRequired, contactController.index);
route.post('/contact/register', loginRequired, contactController.register);
route.get('/contact/:id', loginRequired, contactController.editIndex);
route.post('/contact/edit/:id', loginRequired, contactController.edit);
route.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = route;