module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Proyectos','role',Sequelize.STRING),
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Proyectos','role'),
};