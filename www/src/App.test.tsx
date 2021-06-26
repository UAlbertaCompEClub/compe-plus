import { screen } from '@testing-library/react';
import React from 'react';

import App from './App';
import { renderWithRootState } from './util/testWithRootState';

describe('App', () => {
    it.each`
        role             | containsString              | friendlyName
        ${'student'}     | ${'CompE+'}                 | ${'a student'}
        ${'reviewer'}    | ${'🚧 Work in progress 🚧'} | ${'a reviewer'}
        ${'interviewer'} | ${'🚧 Work in progress 🚧'} | ${'an interviewer'}
        ${'admin'}       | ${'🚧 Work in progress 🚧'} | ${'an admin'}
    `('renders correctly for $friendlyName', ({ role, containsString }) => {
        renderWithRootState(<App />, { user: { roles: [], currentRole: role } });

        const componentsWithText = screen.getAllByText(containsString);
        expect(componentsWithText[0]).toBeInTheDocument();
    });
});
