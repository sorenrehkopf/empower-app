const db = require('../models'); // Not using TS for sequelize atm.
const { Note } = db;

type FastifyRequest = {
	params: any,
	body: any
};

const NotesEndpointRoot = '/notes';

export default async function routes (fastify: any, options: any) {
	// Gets the last 100 created notes.
	fastify.get(`${NotesEndpointRoot}`, async () => {
		const notes = await Note.findAll({
			limit: 100,
			order: [['createdAt', 'DESC']]
		});

		return { notes };
	});

	// Get a specific note by id.
	fastify.get(`${NotesEndpointRoot}/:noteId`, async ({ params: { noteId: id } }: FastifyRequest) => {
		const note = await Note.findOne({ where: { id } });

		return { note };
	});

	// This route serves as both create and update for notes.
	// May want to split this into separate routes for good separation of concerns
	// in the future but for the time being this is simpler for the client to interface with.
	fastify.post(`${NotesEndpointRoot}`, async ({ body }: FastifyRequest) => {
		const { id, contactName, noteText } = JSON.parse(body);
		let note: any = null;

		if (id) {
			note = await Note.findOne({ where: { id } })
			note = await note.update({ contactName, noteText })
		} else {
			note = await Note.create({ contactName, noteText });
		}

		return { note };
	});

	//Delete a note by id.
	fastify.delete(`${NotesEndpointRoot}`, async ({ body }: FastifyRequest) => {
		const { id } = JSON.parse(body);
		const note = await Note.findOne({ where: { id } });
		const deleted = await note.destroy();

		return { deleted };
	});
};
