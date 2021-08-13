import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import ResumeReview from './ResumeReview';

jest.mock('../../redux/substores/student/studentHooks');
const useStudentDispatchMock = mocked(useStudentDispatch, true);
const useStudentSelectorMock = mocked(useStudentSelector, true);

describe('StudentResumeReview', () => {
    const dispatchMock = jest.fn();

    const studentStateMock = {
        resumeReview: {
            resumeReviews: [],
            isLoading: false,
        },
    };

    it('renders correctly', () => {
        useStudentDispatchMock.mockReturnValue(dispatchMock);
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));

        render(<ResumeReview />);

        const componentsWithText = screen.getAllByText('Submit resume');
        expect(componentsWithText[0]).toBeInTheDocument();
    });
});
