module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('Proyecto','alcance',Sequelize.STRING),  
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','alcance'),
};