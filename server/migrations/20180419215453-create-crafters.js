module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Crafters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      drivername: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      numero: {
        type: Sequelize.STRING,
      },
      fotografia: {
        type: Sequelize.STRING,
      },
      latitud: {
        type: Sequelize.DOUBLE,
      },
      longitud: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Crafters'),
};