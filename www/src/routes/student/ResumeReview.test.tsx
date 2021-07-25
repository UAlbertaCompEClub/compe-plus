import { render, screen } from '@testing-library/react';
import React from 'react';

import ResumeReview from './ResumeReview';

describe('StudentResumeReview', () => {
    it('renders correctly', () => {
        render(<ResumeReview />);

        const componentsWithText = screen.getAllByText('Submit resume');
        expect(componentsWithText[0]).toBeInTheDocument();
    });
});
