'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ticket_details', {
    uuid : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    serviceCategory: DataTypes.STRING,
    projectName: DataTypes.STRING,
    tierOneCategory: DataTypes.STRING,
    tierTwoCategory: DataTypes.STRING,
    tierThreeCategory: DataTypes.STRING,
    urgency: DataTypes.STRING,
    attachment: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false
  });
};
