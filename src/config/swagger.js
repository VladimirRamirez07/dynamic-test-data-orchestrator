const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dynamic Test Data Orchestrator API',
      version: '1.0.0',
      description: 'REST API for dynamic database seeding and resetting before test suites',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/api/server.js'],
};

module.exports = swaggerJsdoc(options);