var mysql = require('mysql'),
  Sequelize = require('sequelize'),
  appConfig = require('./../../../config/config.js');

var sequelize = new Sequelize( appConfig['db.schema'],
appConfig['db.username'], appConfig["db.password"], {
  host : appConfig['db.host'],
  dialect : 'mysql',
  pool : {
    max : 5,
    min : 1,
    idel : 10000
  },
  define: {
    timestamps: false
  }
});
module.exports = sequelize;
