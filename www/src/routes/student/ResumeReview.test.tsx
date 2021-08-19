import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import { StudentState } from '../../redux/substores/student/studentStore';
import getMyResumeReviews from '../../redux/substores/student/thunks/getMyResumeReviews';
import testConstants from '../../util/testConstants';
import ResumeReview from './ResumeReview';

jest.mock('../../redux/substores/student/studentHooks');
const mockUseStudentDispatch = mocked(useStudentDispatch, true);
const mockUseStudentSelector = mocked(useStudentSelector, true);

jest.mock('../../redux/substores/student/thunks/getMyResumeReviews');
const mockGetMyResumeReviews = mocked(getMyResumeReviews, true);

describe('StudentResumeReview', () => {
    const mockDispatch = jest.fn();
    let mockStudentState: StudentState;

    beforeEach(() => {
        mockStudentState = testConstants.studentState;
    });

    beforeEach(() => {
        mockUseStudentDispatch.mockReturnValue(mockDispatch);
        mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));
    });

    it('renders correctly', () => {
        render(<ResumeReview />);

        const componentsWithText = screen.getAllByText('Submit resume');
        expect(componentsWithText[0]).toBeInTheDocument();
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeReview />);

        expect(mockGetMyResumeReviews).toBeCalled();
    });
});
