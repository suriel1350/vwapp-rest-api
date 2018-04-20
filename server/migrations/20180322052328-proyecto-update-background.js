module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('Proyecto','background',Sequelize.STRING),  
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','background'),
};