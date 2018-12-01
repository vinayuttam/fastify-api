/**
 * Dependencies
 */
const { UserHandler } = require('../handlers');

async function UserRoutes(fastify, options) {
  fastify.post('/register-user', {
    schema: {
      tags: ['User'],
      body: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
          }
        },
        '4xx': {
          type: 'object',
          properties: {
            statusCode: { type: 'string' },
            error: { type: 'string' },
            message: { type: 'string' },
          }
        }
      },
    },
    handler: UserHandler.registerUser,
  });

  fastify.post('/authenticate-user', {
    schema: {
      description: 'Authenticate a user using email address and password',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        '4xx': {
          type: 'object',
          properties: {
            statusCode: { type: 'string' },
            error: { type: 'string' },
            message: { type: 'string' },
          }
        }
      },
    },
    handler: UserHandler.authenticateUser,
  });

  fastify.get('/users', {
    schema: {
      tags: ['User'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
            },
          },
        },
        '4xx': {
          type: 'object',
          properties: {
            statusCode: { type: 'string' },
            error: { type: 'string' },
            message: { type: 'string' },
          }
        }
      },
    },
    beforeHandler: [fastify.authenticate],
    handler: UserHandler.listUsers,
  });
};

module.exports = UserRoutes;
