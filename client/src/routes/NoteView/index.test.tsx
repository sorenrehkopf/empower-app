import NoteView from '.';

describe('when there is no noteId in the params', () => {
	it('hides the delete button', () => {
		// TODO
	})
});

describe('when there is a noteId in the params', () => {
	it('loads the note for the given id', async () => {
		// TODO
	})

	it('shows the delete button', () => {
		// TODO
	})

	describe('when in read mode', () => {
		it('shows the edit button', () => {
			// TODO
		})
	});
});

describe('when in edit mode', () => {
	it('shows the data as editable', () => {
		// TODO
	})

	it('shows the save button', () => {
		// TODO
	})

	describe('when one of the fields is empty', () => {
		it('disables the save button', () => {
			// TODO
		})
	})

	describe('when both fields are filled out', () => {
		it('enables the save button', () => {
			// TODO
		})

		describe('when clicking the save button for a new note', () => {
			it('sends the note data to the server with no id', () => {
				// TODO
			})
		})

		describe('when clicking the save button for an existing note', () => {
			it('sends the note data to the server including the note id', () => {
				// TODO
			})
		})
	})
});
