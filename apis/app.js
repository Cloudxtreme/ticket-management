'use strict';

var SwaggerExpress = require('swagger-express-mw'),
app = require('express')(),
cors = require('cors');

module.exports = app; // for testing

app.disable('x-powered-by');

var config = {
  appRoot: __dirname // required config
};

app.use(cors());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  // currently this swagger project doesn't support online docs, this is a hack to achieve that.
  require('./api/docs/swagger-ui-router.js')(app);

  var port = process.env.PORT || 8080;
  app.listen(port);

  console.log('server started at http://localhost:${port}/ticket-management/api/v1/swagger');
});
