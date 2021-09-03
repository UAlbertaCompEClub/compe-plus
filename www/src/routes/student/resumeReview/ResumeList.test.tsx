import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentState } from '../../../redux/substores/student/studentStore';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import testConstants from '../../../util/testConstants';
import NoResumes from './NoResumes';
import ResumeList from './ResumeList';
import ResumeReviewCard from './ResumeReviewCard';

jest.mock('../../../redux/substores/student/studentHooks');
const mockUseStudentDispatch = mocked(useStudentDispatch, true);
const mockUseStudentSelector = mocked(useStudentSelector, true);

jest.mock('../../../redux/substores/student/thunks/getMyResumeReviews');
const mockGetMyResumeReview = mocked(getMyResumeReviews, true);

describe('StudentResumeList', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = testConstants.studentState;
        mockUseStudentDispatch.mockReturnValue(dispatchMock);
        mockUseStudentSelector.mockImplementation((selector) => selector(studentStateMock));
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeList />);

        expect(mockGetMyResumeReview).toBeCalled();
    });

    it.each(['seeking_reviewer', 'reviewing', 'finished', 'canceled'])('displays current and submitted resumes correctly', (state) => {
        const mockCurrentResumeReview = testConstants.resumeReview1;
        mockCurrentResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';
        studentStateMock.resumeReview.resumeReviews = [mockCurrentResumeReview];

        mockUseStudentSelector.mockImplementation((selector) => selector(studentStateMock));

        const result = shallow(<ResumeList />);

        expect(result.find(ResumeReviewCard)).toHaveLength(1);

        if (state === 'seeking_reviewer' || state === 'reviewing') {
            // Current resumes
            expect(result.text()).toContain('You have no submitted resumes');
        } else {
            // Submitted resumes
            expect(result.find(NoResumes)).toHaveLength(1);
        }
    });
});
