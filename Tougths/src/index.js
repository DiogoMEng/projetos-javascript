// # PENDÊNCIAS DE PROJETO #
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

// # CONEXÃO #
const conn = require('./db/conn.js');

// # MODELS #
const Tougth = require('./models/Tougth.js');
const User = require('./models/User.js');

// # CONTROLLERS #
const ToughtController = require('./controllers/ToughtController.js');

// # ROUTES #
const toughtsRouter = require('./routes/toughtsRouter.js');

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  name: "session",
  secret: "nosso_secret",
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function() {},
    path: require('path').resolve(__dirname, "sessions")
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}));
app.use(flash());
app.use((req, res, next) => {

  if(req.session.userid) {
    res.locals.session = req.session;
  }

});
app.use("/toughts", toughtsRouter);
app.use("/", ToughtController.showToughts);


conn.sync()
  .then(() => {
    app.listen(3001, () => console.log('http://localhost:3001'))
  })
  .catch(err => console.log(err));