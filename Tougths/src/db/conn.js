const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Conexão realizada');
} catch(err) {
  console.log('Erro na conexão', err);
}

module.exports = sequelize;