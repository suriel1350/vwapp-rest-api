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
        allowNull: false,
      },
      background: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      riesgos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alcance: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechainicio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechafinal: {
        type: Sequelize.STRING,
        allowNull: false,
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