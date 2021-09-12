import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useStudentSelector } from '../../redux/substores/student/studentHooks';
import { StudentState } from '../../redux/substores/student/studentStore';
import testConstants from '../../util/testConstants';
import ResumeReview from './ResumeReview';
import ResumeList from './resumeReview/ResumeList';
import UploadResume from './resumeReview/UploadResume';

jest.mock('../../redux/substores/student/studentHooks');
const mockUseStudentSelector = mocked(useStudentSelector, true);

describe('StudentResumeReview', () => {
    let mockStudentState: StudentState;

    beforeEach(() => {
        mockStudentState = testConstants.studentState;
    });

    beforeEach(() => {
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
});
