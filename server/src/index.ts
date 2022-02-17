import Fastify from 'fastify'
import fastifyCors from 'fastify-cors';
import notesController from './controllers/notes';

const fastify = Fastify({
	logger: true
});

fastify.register(fastifyCors, {
	origin: ['http://localhost:3000']
});
fastify.register(notesController)

fastify.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
