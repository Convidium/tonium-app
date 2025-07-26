const fastify = require('fastify')();

fastify.get('/ping', async (request, reply) => {
  return { pong: 'it works!' };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Backend running at ${address}`);
});