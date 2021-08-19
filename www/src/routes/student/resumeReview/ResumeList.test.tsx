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

jest.mock('../../../redux/substores/student/studentHooks');
const mockUseStudentDispatch = mocked(useStudentDispatch, true);
const mockUseStudentSelector = mocked(useStudentSelector, true);

jest.mock('../../../redux/substores/student/thunks/getMyResumeReviews');
const mockGetMyResumeReview = mocked(getMyResumeReviews, true);

describe('StudentResumeList', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = testConstants.studentStateMock;
        mockUseStudentDispatch.mockReturnValue(dispatchMock);
        mockUseStudentSelector.mockImplementation((selector) => selector(studentStateMock));
    });

    it('renders correctly for no resumes', () => {
        const result = shallow(<ResumeList />);

        expect(result.find(NoResumes)).toHaveLength(1);
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeList />);

        expect(mockGetMyResumeReview).toBeCalled();
    });
});
