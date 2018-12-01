module.exports = {
  port: 4000,
  dbConfig: {
    uri: 'mongodb://localhost:27017/fastify-api-test',
    options: {
      useNewUrlParser: true
    },
  },
  jwt: {
    secret: 'jwt-secret',
    expiresIn: 3600
  },
};
