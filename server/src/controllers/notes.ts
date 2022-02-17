import Fastify from 'fastify';
export const NotesEndpointRoot = '/notes';

export default async function routes (fastify: any, options: any) {
	fastify.get(`${NotesEndpointRoot}`, async () => {
		return {
			notes: [{id: 'id woah', contactName: 'fred', noteText: 'woaaaaaaa'}]
		}
	})
};
