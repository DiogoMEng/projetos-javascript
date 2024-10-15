const bcryptjs = require('bcryptjs');

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert('users', [{
      name: 'Cristian Mello',
      email: 'sdjfilhos@gmail.com',
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down () {}
};
