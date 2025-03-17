import fastify, { FastifyInstance } from 'fastify';
import exampleRoute from "./routes/example"
import deviceDetailsRouter from "./routes/deviceDetails";

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(exampleRoute)
server.register(deviceDetailsRouter)

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    const address = server.server.address();
    console.log(`Server listening at ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();