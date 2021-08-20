import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import App from './App';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AppDispatch, RootState } from './redux/store';
import checkUserRegistration from './redux/thunks/checkUserRegistration';
import Landing from './routes/unauthenticated/Landing';
import TokenAcquirer from './util/auth0/TokenAcquirer';
import { WrappedUser } from './util/serverResponses';
import { setupIntersectionObserverMock } from './util/test/intersectionObserverMock';
import testConstants from './util/testConstants';
import { withAuth0 } from './util/testWithAuth0';

jest.mock('@auth0/auth0-react');
const mockUseAuth0 = mocked(useAuth0);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('./redux/hooks');
const mockUseAppDispatch = mocked(useAppDispatch, true);
const mockUseAppSelector = mocked(useAppSelector, true);

jest.mock('./redux/thunks/checkUserRegistration');
const mockCheckUserRegistration = mocked(checkUserRegistration);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('App', () => {
    let mockGlobalStore: RootState;
    let mockDispatch: jest.MockedFunction<AppDispatch>;
    let mockAuth0State: Auth0ContextInterface<User>;

    beforeEach(() => {
        setupIntersectionObserverMock();

        mockDispatch = jest.fn();
        mockUseAppDispatch.mockReturnValue(mockDispatch);

        mockGlobalStore = testConstants.globalState;
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        mockAuth0State = {
            isAuthenticated: false,
            isLoading: false,
        } as unknown as Auth0ContextInterface<User>;
        mockUseAuth0.mockReturnValue(mockAuth0State);
    });

    it.each`
        role             | friendlyName
        ${'student'}     | ${'a student'}
        ${'reviewer'}    | ${'a reviewer'}
        ${'interviewer'} | ${'an interviewer'}
        ${'admin'}       | ${'an admin'}
    `('renders Landing by default for $friendlyName', ({ role }) => {
        mockGlobalStore.user.currentRole = role;

        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));
        mockAuth0State.isAuthenticated = true;

        const result = shallow(<App />);
        expect(result.find(Landing)).not.toBeNull();
    });

    it.each`
        isAuthenticated | friendlyName
        ${true}         | ${'calls check user registration on authenticated'}
        ${false}        | ${'does not call check user registration if user is not authenticated'}
    `('$friendlyName', (isAuthenticated) => {
        mockAuth0State.isAuthenticated = isAuthenticated;

        const mockAction = {};
        mockCheckUserRegistration.mockReturnValueOnce(mockAction as AsyncThunkAction<WrappedUser | null | undefined, TokenAcquirer, never>);

        render(withAuth0(<App />, mockAuth0State));

        if (isAuthenticated) {
            expect(mockDispatch).toBeCalledWith(mockAction);
        } else {
            expect(mockDispatch).not.toBeCalled();
        }
    });

    it.todo('fetches user role');
});
