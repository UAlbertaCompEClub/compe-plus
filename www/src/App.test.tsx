import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CompE+', () => {
    render(<App />);
    const linkElement = screen.getAllByText('CompE+');
    expect(linkElement[0]).toBeInTheDocument();
});
