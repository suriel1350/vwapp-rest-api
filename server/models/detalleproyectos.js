module.exports = (sequelize, DataTypes) => {
  const DetalleProyectos = sequelize.define('DetalleProyectos', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  DetalleProyectos.associate = (models) => {
    DetalleProyectos.belongsTo(models.Miembros, {
      foreignKey: 'idmiembros',
      onDelete: 'CASCADE',
    });

    DetalleProyectos.belongsTo(models.Proyectos, {
      foreignKey: 'idproyectos',
      onDelete: 'CASCADE',
    });    
  };

  return DetalleProyectos;
};