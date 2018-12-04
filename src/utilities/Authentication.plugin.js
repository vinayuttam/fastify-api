/**
 * Dependencies
 */
const FastifyPlugin = require('fastify-plugin');
const FastifyJWT = require('fastify-jwt');
const { Unauthorized } = require('http-errors');

const config = require('../config');

module.exports = FastifyPlugin(function (fastify, options, next) {
  fastify.register(FastifyJWT, {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn,
    }
  });

  fastify.decorate('authenticate', async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      console.log(err)
      throw new Unauthorized('Token missing (or) Invalid authorization token');
    }
  });
  next();
});
