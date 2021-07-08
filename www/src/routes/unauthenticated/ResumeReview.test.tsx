import { render, screen } from '@testing-library/react';
import React from 'react';

import ResumeReview from './ResumeReview';

describe('UnauthenticatedResumeReview', () => {
    it('renders correctly', () => {
        render(<ResumeReview />);

        const searchTexts = ['Upload your resume to CompE+', 'Have a trained Reviewer make suggestions and comments', 'Receive the feedback and iterate on your resume'];

        for (const searchText of searchTexts) {
            const componentsWithText = screen.getAllByText(searchText);
            expect(componentsWithText[0]).toBeInTheDocument();
        }
    });
});
