import { AsyncThunkAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import App from './App';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AppDispatch, RootState } from './redux/store';
import checkUserRegistration from './redux/thunks/checkUserRegistration';
import TokenAcquirer from './util/auth0/TokenAcquirer';
import { WrappedUser } from './util/serverResponses';
import { setupIntersectionObserverMock } from './util/test/intersectionObserverMock';
import testConstants from './util/testConstants';
import { withAuth0 } from './util/testWithAuth0';

jest.mock('./redux/hooks');
const useAppDispatchMock = mocked(useAppDispatch, true);
const useAppSelectorMock = mocked(useAppSelector, true);

jest.mock('./redux/thunks/checkUserRegistration');
const checkUserRegistrationMock = mocked(checkUserRegistration);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe('App', () => {
    let globalStoreMock: RootState;
    let dispatchMock: jest.MockedFunction<AppDispatch>;

    beforeEach(() => {
        setupIntersectionObserverMock();
        globalStoreMock = testConstants.globalStoreMock;

        dispatchMock = jest.fn();
        useAppDispatchMock.mockReturnValue(dispatchMock);
    });

    it.each`
        role             | containsString              | friendlyName
        ${'student'}     | ${'CompE+'}                 | ${'a student'}
        ${'reviewer'}    | ${'🚧 Work in progress 🚧'} | ${'a reviewer'}
        ${'interviewer'} | ${'🚧 Work in progress 🚧'} | ${'an interviewer'}
        ${'admin'}       | ${'🚧 Work in progress 🚧'} | ${'an admin'}
    `('renders correctly for $friendlyName', ({ role, containsString }) => {
        globalStoreMock.user.currentRole = role;
        const auth0State = { isAuthenticated: true };

        useAppSelectorMock.mockImplementation((selector) => selector(globalStoreMock));

        render(withAuth0(<App />, auth0State));

        const componentsWithText = screen.getAllByText(containsString);
        expect(componentsWithText[0]).toBeInTheDocument();
    });

    it.each`
        isAuthenticated | friendlyName
        ${true}         | ${'calls check user registration on authenticated'}
        ${false}        | ${'does not call check user registration if user is not authenticated'}
    `('$friendlyName', (isAuthenticated) => {
        const auth0State = { isAuthenticated };

        const actionMock = {};
        checkUserRegistrationMock.mockReturnValueOnce(actionMock as AsyncThunkAction<WrappedUser | null | undefined, TokenAcquirer, never>);

        useAppSelectorMock.mockImplementation((selector) => selector(globalStoreMock));

        render(withAuth0(<App />, auth0State));

        if (isAuthenticated) {
            expect(dispatchMock).toBeCalledWith(actionMock);
        } else {
            expect(dispatchMock).not.toBeCalled();
        }
    });
});
