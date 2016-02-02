'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('project_details', {
    uuid : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    name: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
    createdAt : "created",
    updatedAt : "updated",
  });
};
