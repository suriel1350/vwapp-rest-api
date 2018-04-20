module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Miembros','role',Sequelize.STRING),
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','role'),
};