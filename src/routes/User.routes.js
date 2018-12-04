/**
 * Dependencies
 */
const { UserHandler } = require('../handlers');
const { ErrorSchema, UserSchema } = require('../schema');

async function UserRoutes(fastify, options) {
  fastify.post('/register-user', {
    schema: {
      tags: ['User'],
      body: UserSchema.input,
      response: {
        200: UserSchema.success,
        '4xx': ErrorSchema,
      },
    },
    handler: UserHandler.registerUser,
  });

  fastify.post('/authenticate-user', {
    schema: {
      description: 'Authenticate a user using email address and password',
      tags: ['User'],
      body: UserSchema.authentication.input,
      response: {
        200: UserSchema.authentication.success,
        '4xx': ErrorSchema
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
          items: UserSchema.success,
        },
        '4xx': ErrorSchema
      },
    },
    beforeHandler: [fastify.authenticate],
    handler: UserHandler.listUsers,
  });
};

module.exports = UserRoutes;
