import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NotesList from './routes/NotesList';
import NoteView from './routes/NoteView';

const App = () => (
  <Router>
    <Routes>
      <Route path="/note/new" element={<NoteView edit={true} />} />
      <Route path="/note/:noteId" element={<NoteView edit={false} />} />
      <Route path="/note/:noteId/edit" element={<NoteView edit={true} />} />
      <Route path="/" element={<NotesList />} />
    </Routes>
  </Router>
);

export default App;
