import NotesList from '.';

describe('when there are notes to render', () => {
	it('renders the notes', async () => {
		// TODO
	})

	describe('when the text for a note is longer than the trunc length', () => {
		it('truncates the preview text shown', () => {
			// TODO
		})
	});
});

describe('when clicking the delete icon on a note', () => {
	it('tells the server to delete the selected note', () => {
		// TODO
	})

	describe('when the server successfully deletes the note', () => {
		it('removes the deleted note from the rendered notes', () => {
			// TODO
		})
	});

	describe('when the server failes to delete the note', () => {
		it('continues rendering the note', () => {
			// TODO
		})
	});
});
