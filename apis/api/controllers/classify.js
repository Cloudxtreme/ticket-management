'use strict';

var classifier = require('./../helpers/classifier-service.js');

function getClassifications(req, res) {

  var params = {
    classifier: classifier.classifierId,
    text: req.body.description
  };

  classifier.nlClassifier.classify(params, function(err, results) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(results);
    }
  });

var ticketDetails =  {
  "requestDetails": req.body,
  "requesterId": req.swagger.params.userId.value,
  "ticketDetails": {
    "serviceCategory": "string",
    "tierOneCategory": "string",
    "tierTwoCategory": "string",
    "tierThreeCategory": "string",
    "urgency": "string"
  }
}

  res.json(ticketDetails);
}

module.exports = {
  classify : getClassifications
};
