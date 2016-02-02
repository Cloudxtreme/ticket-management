'use strict';

var User = require('./../dao/helper/orm-mapping.js').User,
  Project = require('./../dao/helper/orm-mapping.js').Project;

function getUserById(req, res) {

  var userId = req.swagger.params.userId.value;

  console.log('user id received : ' + userId);

  User.findById(userId).then(function (user) {
    if (user) {

      user = JSON.parse(JSON.stringify(user.dataValues));

      if(!user.profilePicture) {
        delete user.profilePicture;
      }

      // some issue with date -- need to check later
      delete user.dateOfBirth;

      Project.findById(user.project_id).then(function(project) {

        user.project = project;
        console.log(user);
        res.json(user);
      });

    } else {
      res.statusCode = 404;
      res.json({message : "User not found."});
    }
  }).catch(function (error) {
    res.statusCode = 400;
    console.log(error);
    res.json(error);
  });
}

module.exports = {
  getById : getUserById
};
