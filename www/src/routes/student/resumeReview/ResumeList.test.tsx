import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentState } from '../../../redux/substores/student/studentStore';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './NoResumes';
import ResumeList from './ResumeList';

jest.mock('../../../redux/substores/student/studentHooks');
const useStudentDispatchMock = mocked(useStudentDispatch, true);
const useStudentSelectorMock = mocked(useStudentSelector, true);

jest.mock('../../../redux/substores/student/thunks/getMyResumeReviews');
const getMyResumeReviewsMock = mocked(getMyResumeReviews, true);

describe('StudentResumeList', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = {
            resumeReview: {
                resumeReviews: [],
                isLoading: false,
                isUploading: false,
            },
            uploadResume: {
                document: null,
                isLoading: false,
                isUploadComplete: false,
            },
        };
        useStudentDispatchMock.mockReturnValue(dispatchMock);
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));
    });

    it('renders correctly for no resumes', () => {
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));

        const result = shallow(<ResumeList />);
        expect(result.find(NoResumes)).toHaveLength(1);
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeList />);

        expect(getMyResumeReviewsMock).toBeCalled();
    });
});
