'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('request', {
    uuid : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    summary: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
};
