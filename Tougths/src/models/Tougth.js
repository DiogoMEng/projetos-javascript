const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');

const User = require('./User.js')

const Tougth = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
});

Tougth.belongsTo(User);
User.hasMany(Tougth);

module.exports = Tougth;