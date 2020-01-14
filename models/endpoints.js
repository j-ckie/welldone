'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endpoints = sequelize.define('Endpoints', {
    user_id: DataTypes.INTEGER,
    endpoint_data: DataTypes.TEXT
  }, {});
  Endpoints.associate = function(models) {
    // associations can be defined here
  };
  return Endpoints;
};