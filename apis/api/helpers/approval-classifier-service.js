'use strict';

var watson = require('watson-developer-cloud'),
util = require('util'),
bluemix = require('./../../config/bluemix.js'),
appConfig = require('./../../config/config.js');

// if bluemix credentials exists, then override local configurations
var credentials =  util._extend({
  version: appConfig['nlc.api.version'],
  url : appConfig['nlc.api.path'],
  username : appConfig['nlc.approval.service.username'],
  password : appConfig['nlc.approval.service.password'],
}, bluemix.getServiceCreds('natural_language_classifier'));

module.exports.classifierId = process.env.CLASSIFIER_ID || appConfig['nlc.approval.service.classifier'];
module.exports.nlClassifier = watson.natural_language_classifier(credentials);
