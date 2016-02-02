'use strict';

var jwt = require('jsonwebtoken'),
  config = require('./../../config/config.js'),
  User = require('./../dao/helper/orm-mapping.js').User;

function sendResponse(res, userToken) {
  res.json(userToken);
}

function generateToken(userObj, res, cb) {
  jwt.sign(
    {
      username: userObj.username,
      uuid: userObj.uuid
    },
    config["secret.key"],
    {
      algorithm: 'HS256',
      expiresIn: "2 days"
    },
    function (token) {
      var userToken = {
        "username": userObj.username,
        "uuid" : userObj.uuid,
        "token": token
      };
      cb(res, userToken);
    }
  );
}

function authenticateUser(req, res) {

  var userObj = req.body;

  User.findAll(
    {
      where: userObj,
    }
  ).then(function (result) {

    if (result.length) {
      userObj.uuid = result[0].dataValues.uuid;
      generateToken(userObj, res, sendResponse);
    } else {
      res.statusCode = 401;
      res.json({message : "Incorrect username or password."});
    }
  });
}

module.exports = {
  auth: authenticateUser
};
