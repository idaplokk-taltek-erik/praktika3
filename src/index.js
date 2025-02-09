// src/index.js
const fastify = require('fastify')({ logger: true });
const apiTokenRoutes = require('./routes/api_token_routes');

// Register @fastify/swagger to generate the OpenAPI spec.
fastify.register(require('@fastify/swagger'), {
  routePrefix: '/documentation', // This is where the generated spec is available
  openapi: {
    info: {
      title: 'User API',
      description: 'API documentation for the User endpoints',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  exposeRoute: true, // Expose the swagger JSON at /documentation/json by default
});

// Register @fastify/swagger-ui to serve the Swagger UI.
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation', // Serves the Swagger UI at /documentation
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true, // Optional: Enforce a strict Content-Security-Policy
});

// A simple root route for testing
fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Fastify server connected to SQLite3!' };
});

// Register user routes
fastify.register(apiTokenRoutes);

// Updated listen call for Fastify v5 (options object required)
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`
    );

    fastify.ready((err) => {
      if (err) throw err;
      console.log(fastify.printRoutes());
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
