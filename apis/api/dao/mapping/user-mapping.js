'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey : true
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name"
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      field: "date_of_birth"
    },
    gender: {
      type: DataTypes.STRING,
      field: "gender"
    },
    mobileNo: {
      type: DataTypes.BIGINT(11),
      field: "mobile_no"
    },
    username: {
      type: DataTypes.STRING,
      field: "username",
      unique: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      field: "profile_picture"
    },
    password: {
      type: DataTypes.STRING,
      field: "password"
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt : "created",
    updatedAt : "updated",
    underscored: true
  });
};
