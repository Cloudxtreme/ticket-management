'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ticket', {
    uuid : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    status : DataTypes.STRING,
    remarks: DataTypes.STRING,
    completed : DataTypes.DATE,
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt : "created",
    updatedAt : "updated",
    underscored: true
  });
};
