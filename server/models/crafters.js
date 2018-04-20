module.exports = (sequelize, DataTypes) => {
  const Crafters = sequelize.define('Crafters', {    
      nombre: {
        type: DataTypes.STRING,
      },
      drivername: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.STRING,
      },
      fotografia: {
        type: DataTypes.STRING,
      },
      latitud: {
        type: DataTypes.DOUBLE,
      },
      longitud: {
        type: DataTypes.DOUBLE,
      },
  });

  return Crafters;
};