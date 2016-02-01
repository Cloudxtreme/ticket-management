'use strict';

function getClassifications(req, res) {

  console.log(req.body);

  var ticketDetails = {
  };

  res.json(ticketDetails);
}

module.exports = {
  classify : getClassifications
};
