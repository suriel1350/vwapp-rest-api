module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('Proyecto','vision',Sequelize.STRING),  
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','vision'),
};