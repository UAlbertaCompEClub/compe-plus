import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import App from './App';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setupIntersectionObserverMock } from './util/test/intersectionObserverMock';
import { withAuth0 } from './util/testWithAuth0';
import { withRootState } from './util/testWithRootState';

jest.mock('./redux/hooks');

describe('App', () => {
    beforeEach(() => setupIntersectionObserverMock());

    it.each`
        role             | containsString              | friendlyName
        ${'student'}     | ${'CompE+'}                 | ${'a student'}
        ${'reviewer'}    | ${'🚧 Work in progress 🚧'} | ${'a reviewer'}
        ${'interviewer'} | ${'🚧 Work in progress 🚧'} | ${'an interviewer'}
        ${'admin'}       | ${'🚧 Work in progress 🚧'} | ${'an admin'}
    `('renders correctly for $friendlyName', ({ role, containsString }) => {
        const useAppDispatchMock = mocked(useAppDispatch, true);
        const useAppSelectorMock = mocked(useAppSelector, true);

        const dispatchMock = jest.fn();
        useAppDispatchMock.mockReturnValue(dispatchMock);

        const rootState = { user: { roles: [], currentRole: role, isLoading: false, hasRegistered: true } };
        const auth0State = { isAuthenticated: true };

        useAppSelectorMock.mockImplementation((selector) => selector(rootState));

        render(withAuth0(withRootState(<App />, rootState), auth0State));

        const componentsWithText = screen.getAllByText(containsString);
        expect(componentsWithText[0]).toBeInTheDocument();
    });
});
