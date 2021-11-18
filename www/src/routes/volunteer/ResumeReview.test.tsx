import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { SubsetUserState } from '../../contexts/UserContext';
import useUserContext from '../../hooks/useUserContext';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';
import testConstants from '../../util/testConstants';
import ResumeReview from './ResumeReview';
import ResumeReviewTable from './ResumeReviewTable';

jest.mock('../../redux/substores/volunteer/volunteerHooks');
const mockUseVolunteerSelector = mocked(useVolunteerSelector, true);
const mockUseVolunteerDispatch = mocked(useVolunteerDispatch, true);

jest.mock('../../hooks/useUserContext');
const mockUseUserContext = mocked(useUserContext, true);
const mockDispatch = jest.fn();

beforeEach(() => {
    mockUseVolunteerSelector.mockImplementation((selector) => selector(testConstants.volunteerState));
    mockUseVolunteerDispatch.mockImplementation(mockDispatch);

    jest.clearAllMocks();
});

it('disables table actions when user has not agreed to terms of service', () => {
    mockUseUserContext.mockReturnValueOnce({
        hasAgreedToTermsOfService: false,
    } as SubsetUserState);
    const mockVolunteerState = testConstants.volunteerState;
    mockVolunteerState.resumeReview.availableResumes = [testConstants.resumeReviewWithUserDetails1];
    mockVolunteerState.resumeReview.reviewingResumes = [testConstants.resumeReviewWithUserDetails1];

    const result = shallow(<ResumeReview />);

    const tables = result.find(ResumeReviewTable);
    expect(tables).toHaveLength(2);
    tables.forEach((tableComponent) => {
        const actions = tableComponent.prop('actions');
        for (const action of actions) {
            expect(action.disabled).toBe(true);
        }
    });
});
