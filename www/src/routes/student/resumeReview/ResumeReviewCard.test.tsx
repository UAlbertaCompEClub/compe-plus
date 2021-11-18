import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { SubsetUserState } from '../../../contexts/UserContext';
import useUserContext from '../../../hooks/useUserContext';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import testConstants from '../../../util/testConstants';
import ResumeReviewCard from './ResumeReviewCard';

jest.mock('../../../redux/substores/student/studentHooks');
const mockUseStudentDispatch = mocked(useStudentDispatch, true);
const mockUseStudentSelector = mocked(useStudentSelector, true);

jest.mock('../../../hooks/useUserContext');
const mockUseUserContext = mocked(useUserContext, true);

beforeEach(() => {
    const mockStudentState = testConstants.studentState;
    mockUseStudentSelector.mockImplementation((selector) => selector(mockStudentState));

    mockUseUserContext.mockReturnValue(testConstants.subsetUser1);

    mockUseStudentDispatch.mockReturnValue(jest.fn());
});

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the View button only when a review is not finished', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'finished') {
        expect(result.text()).not.toContain('View');
    } else {
        expect(result.text()).toContain('View');
    }
});

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the Cancel button only when a review is still seeking a reviewer', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'seeking_reviewer') {
        expect(result.text()).toContain('Cancel review');
    } else {
        expect(result.text()).not.toContain('Cancel review');
    }
});

it.each(['cancelled', 'finished', 'reviewing', 'seeking_reviewer'])('displays the expand icon only when a review is finished', (state) => {
    const mockResumeReview = testConstants.resumeReview1;

    mockResumeReview.state = state as 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    if (state === 'finished') {
        expect(result.find(ExpandMoreIcon)).toHaveLength(1);
    } else {
        expect(result.find(ExpandMoreIcon)).toHaveLength(0);
    }
});

it('disables cancel review when user has not agreed to terms of service', () => {
    const mockResumeReview = testConstants.resumeReview1;

    mockUseUserContext.mockReturnValueOnce({
        hasAgreedToTermsOfService: false,
    } as SubsetUserState);

    const result = shallow(<ResumeReviewCard resumeReview={mockResumeReview} />);

    expect(
        result
            .find(Button)
            .findWhere((n) => n.text() === 'Cancel review')
            .first()
            .prop('disabled'),
    ).toBe(true);
});
