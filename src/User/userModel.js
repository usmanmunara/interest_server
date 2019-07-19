const DataTypes = require('sequelize').DataTypes;

module.exports = function(sequelize, modelName) {
  const User = sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    organization: {
      type: DataTypes.STRING(255),
      allowNull: true,
      // unique: 'Username',
      // defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'UserEmail'
    },
    salt: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '9999-12-31 23:59:59'
    },
    props: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  return User;
};
