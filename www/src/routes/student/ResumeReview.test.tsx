import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import { StudentState } from '../../redux/substores/student/studentStore';
import getMyResumeReviews from '../../redux/substores/student/thunks/getMyResumeReviews';
import testConstants from '../../util/testConstants';
import ResumeReview from './ResumeReview';
import ResumeList from './resumeReview/ResumeList';
import UploadResume from './resumeReview/UploadResume';

jest.mock('../../redux/substores/student/studentHooks');
const useStudentDispatchMock = mocked(useStudentDispatch, true);
const useStudentSelectorMock = mocked(useStudentSelector, true);

jest.mock('../../redux/substores/student/thunks/getMyResumeReviews');
const getMyResumeReviewsMock = mocked(getMyResumeReviews, true);

describe('StudentResumeReview', () => {
    const dispatchMock = jest.fn();
    let studentStateMock: StudentState;

    beforeEach(() => {
        studentStateMock = testConstants.studentStateMock;
        useStudentDispatchMock.mockReturnValue(dispatchMock);
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));
    });

    it('renders correctly for list', () => {
        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));

        const result = shallow(<ResumeReview />);
        expect(result.find(ResumeList)).toHaveLength(1);
    });

    it('renders correctly for upload', () => {
        studentStateMock.resumeReview.isUploading = true;

        useStudentSelectorMock.mockImplementation((selector) => selector(studentStateMock));

        const result = shallow(<ResumeReview />);
        expect(result.find(UploadResume)).toHaveLength(1);
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeReview />);

        expect(getMyResumeReviewsMock).toBeCalled();
    });
});
