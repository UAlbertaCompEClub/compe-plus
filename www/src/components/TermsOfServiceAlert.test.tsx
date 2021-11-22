import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import Snackbar from '@material-ui/core/Snackbar';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserState } from '../redux/slices/userSlice';
import { AppDispatch } from '../redux/store';
import testConstants from '../util/testConstants';
import TermsOfServiceAlert from './TermsOfServiceAlert';

jest.mock('@auth0/auth0-react');
const mockUseAuth0 = mocked(useAuth0, true);

jest.mock('../redux/hooks');
const mockUseAppSelector = mocked(useAppSelector, true);
const mockUseAppDispatch = mocked(useAppDispatch, true);

let mockDispatch: jest.MockedFunction<AppDispatch>;

beforeEach(() => {
    mockDispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    jest.clearAllMocks();
});

it.each`
    isAuthenticated | hasAgreedToTermsOfService
    ${false}        | ${false}
    ${false}        | ${true}
    ${true}         | ${false}
    ${true}         | ${true}
`('shows alert only for authenticated users that have not agreed to terms of service', ({ isAuthenticated, hasAgreedToTermsOfService }) => {
    mockUseAuth0.mockReturnValueOnce({
        isAuthenticated,
    } as unknown as Auth0ContextInterface<User>);

    const mockGlobalState = testConstants.globalState;
    mockGlobalState.user = {
        hasAgreedToTermsOfService,
    } as UserState;
    mockUseAppSelector.mockImplementationOnce((selector) => selector(mockGlobalState));

    const shouldBeOpen = isAuthenticated && !hasAgreedToTermsOfService;

    const result = shallow(<TermsOfServiceAlert />);
    expect(result.find(Snackbar).prop('open')).toBe(shouldBeOpen);
});
