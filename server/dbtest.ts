const db = require('./src/models');
const { Note } = db;

Note.create({
	contactName: 'fred',
	noteText: 'waaaaow check  it out'
});
