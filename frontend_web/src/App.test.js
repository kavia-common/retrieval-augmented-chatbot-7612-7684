import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat UI', () => {
  render(<App />);
  expect(screen.getByText(/Conversation/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Ask a question/i)).toBeInTheDocument();
});
