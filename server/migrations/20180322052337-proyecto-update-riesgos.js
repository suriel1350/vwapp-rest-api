module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.changeColumn('Proyecto','riesgos',Sequelize.STRING),  
  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Miembros','riesgos'),
};