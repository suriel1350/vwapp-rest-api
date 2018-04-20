module.exports = (sequelize, DataTypes) => {
  const Proyectos = sequelize.define('Proyectos', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vision: {
      type: DataTypes.STRING,
    },
    background: {
      type: DataTypes.STRING,
    },
    riesgos: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    alcance: {
      type: DataTypes.STRING,
    },
    fechainicio: {
      type: DataTypes.STRING,
    },
    fechafinal: {
      type: DataTypes.STRING,
    },
  });

  Proyectos.associate = (models) => {
    Proyectos.belongsTo(models.Miembros, {
      foreignKey: 'idmiembros',
      onDelete: 'CASCADE',
    });

    Proyectos.hasMany(models.DetalleProyectos, {
      foreignKey: 'idproyectos',
      as: 'idproyectos',
    });

  };

  return Proyectos;
};