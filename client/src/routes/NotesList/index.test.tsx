import React from 'react';
import { render, screen } from '@testing-library/react';
import NotesList from '.';

test('renders learn react link', () => {
  render(<NotesList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
