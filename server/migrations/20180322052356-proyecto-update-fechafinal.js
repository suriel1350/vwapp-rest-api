module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('Proyecto','fechafinal',Sequelize.STRING),  
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','fechafinal'),
};