'use strict';

var classifier = require('./../helpers/classifier-service.js'),
getCategories = require('./../helpers/classify-hierarchy.js').getCategories;

function getClassifications(req, res) {

  var params = {
    classifier: classifier.classifierId,
    text: req.body.description
  };

  classifier.nlClassifier.classify(params, function(err, results) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.json(err);
      return;
    } else {

      // use top class to identify the leaf node of categories hierarchy
      var leaf = results.top_class.replace(/['"]+/g, '').trim();
      var categories = getCategories(leaf);

      if(categories.length) {
        var ticketDetails =  {
          "requestDetails": req.body,
          "requesterId": req.swagger.params.userId.value,
          "ticketDetails": {
            "tierThreeCategory": categories[0],
            "tierTwoCategory": categories[1],
            "tierOneCategory": categories[2],
            "serviceCategory": categories[3],
            "urgency": "3-Medium"
          }
        };

        res.json(ticketDetails);
      } else {
        res.statusCode = 404;
        res.json({"message" : "No classification found for issue description."});
        return;
      }
    }
  });
}

module.exports = {
  classify : getClassifications
};
