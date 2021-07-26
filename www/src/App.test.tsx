import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';
import { setupIntersectionObserverMock } from './util/test/intersectionObserverMock';
import { withAuth0 } from './util/testWithAuth0';
import { withRootState } from './util/testWithRootState';

describe('App', () => {
    beforeEach(() => setupIntersectionObserverMock());

    it.each`
        role             | containsString              | friendlyName
        ${'student'}     | ${'CompE+'}                 | ${'a student'}
        ${'reviewer'}    | ${'🚧 Work in progress 🚧'} | ${'a reviewer'}
        ${'interviewer'} | ${'🚧 Work in progress 🚧'} | ${'an interviewer'}
        ${'admin'}       | ${'🚧 Work in progress 🚧'} | ${'an admin'}
    `('renders correctly for $friendlyName', ({ role, containsString }) => {
        render(withAuth0(withRootState(<App />, { user: { roles: [], currentRole: role, isLoading: false, hasRegistered: true } }), { isAuthenticated: true }));

        const componentsWithText = screen.getAllByText(containsString);
        expect(componentsWithText[0]).toBeInTheDocument();
    });
});
