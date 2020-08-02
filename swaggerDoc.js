const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const appVersion = require('./package.json').version;

const options = {
  swaggerDefinition: {
    info: {
      swagger: '2.0',
      version: '1.0',
      title: `DID Registry API v${appVersion}`,
    },
    basePath: process.env.SWAGGER_BASE_PATH || '/'
  },
  apis: ['./server/api/validation.js', './server/api/dids.js', './server/api/registration.js'],

};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
