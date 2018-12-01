/**
 * Dependencies
 */
const UserRoutes = require('./User.routes');

module.exports = async (fastify, options) => {
  fastify.register(async (fast, option) => {
    fastify.register(UserRoutes);
  }, {
    prefix: '/api',
  });
};
