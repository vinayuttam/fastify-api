/**
 * Dependencies
 */
const path = require("path");
const FastifyAutoLoad = require("fastify-autoload");
const FastifyHelemt = require("fastify-helmet");
const FastifyCORS = require("fastify-cors");
const FastifyOAS = require("fastify-oas");
const mongoose = require("mongoose");

const config = require("./config");
const routes = require("./routes");

const fastifyAuthentication = require("./utilities/Authentication.plugin");

const fastify = require("fastify")({
  logger: true
});

fastify.register(FastifyHelemt);
fastify.register(FastifyCORS);
fastify.register(fastifyAuthentication);

fastify.register(FastifyOAS, {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Swagger Documentation for REST APIs",
      description: "Complete documentation of API",
      version: "1.0.0-SNAPSHOT"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    host: "localhost:4000",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "User", description: "User related end-points" }]
  }
});

fastify.register(routes);

mongoose.connect(
  config.dbConfig.uri,
  config.dbConfig.options,
  err => {
    if (err) {
      fastify.log.error(
        `Could not connect to MongoDB at ${config.dbConfig.uri}`
      );
      console.log(err);
      process.exit(1);
    }

    fastify.listen(config.port, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      fastify.log.info(
        `Successfully Connected to MongoDB at ${config.dbConfig.uri}`
      );
      fastify.log.info(`Fastify API is running on: ${address}`);
    });
  }
);
