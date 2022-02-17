import Fastify from 'fastify';
const db = require('../models');
const { Note } = db;

export const NotesEndpointRoot = '/notes';

export default async function routes (fastify: any, options: any) {
	fastify.get(`${NotesEndpointRoot}`, async () => {
		const notes = await Note.findAll();
		return { notes }
	});
};
