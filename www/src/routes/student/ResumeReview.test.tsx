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

    it('renders correctly for list', () => {
        mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));

        const result = shallow(<ResumeReview />);
        expect(result.find(ResumeList)).toHaveLength(1);
    });

    it('renders correctly for upload', () => {
        mockStudentState.resumeReview.isUploading = true;

        mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));

        const result = shallow(<ResumeReview />);
        expect(result.find(UploadResume)).toHaveLength(1);
    });

    it('calls getMyResumeReviews', () => {
        render(<ResumeReview />);

        expect(mockGetMyResumeReviews).toBeCalled();
    });
});
