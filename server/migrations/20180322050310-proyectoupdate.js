module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Proyecto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vision: {
        type: Sequelize.STRING,
      },
      background: {
        type: Sequelize.STRING,
      },
      riesgos: {
        type: Sequelize.STRING,
      },
      alcance: {
        type: Sequelize.STRING,
      },
      fechainicio: {
        type: Sequelize.STRING,
      },
      fechafinal: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      idmiembros: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Miembros',
          key: 'id',
          as: 'idmiembros',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Proyecto'),
};