'use strict';

var fs = require('fs'),
  path = require('path'),
  serveStatic = require('serve-static'),
  yaml = require('js-yaml');

var SWAGGER_UI_PATH    = '/ticket-management/api/v1/docs';
var SWAGGER_UI_FILES   = './node_modules/swagger-ui/dist';

var indexHtml = fs.readFileSync(path.join(SWAGGER_UI_FILES, 'index.html'), 'utf-8');
var swaggerJson = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf-8'));

// put relative path for loading url in swagger-ui index.html
indexHtml = indexHtml.replace(
  'url = "http://petstore.swagger.io/v2/swagger.json"',
  'url = "../swagger"'
);

module.exports = function docsRouter(app) {
  // serve the modified index.html for swagger ui
  app.get(SWAGGER_UI_PATH, function (req, res) {
    res.setHeader('content-type', 'text/html');
    res.send(indexHtml);
  });

  // serve the static assets for swagger ui
  app.use(SWAGGER_UI_PATH, serveStatic(SWAGGER_UI_FILES));
};
