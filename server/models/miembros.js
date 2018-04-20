module.exports = (sequelize, DataTypes) => {
  const Miembros = sequelize.define('Miembros', {    
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fotografia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Miembros.associate = (models) => {
    Miembros.hasMany(models.Proyectos, {
      foreignKey: 'idmiembros',
      as: 'idmiembros',
    });

    Miembros.hasMany(models.DetalleProyectos, {
      foreignKey: 'idproyectos',
      as: 'idproyectos',
    });
  };

  return Miembros;
};