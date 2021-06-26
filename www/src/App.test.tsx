import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';
import { renderWithRootState } from './util/testWithRootState';

describe('App', () => {
    it.each`
        role             | friendlyName
        ${'student'}     | ${'a student'}
        ${'reviewer'}    | ${'a reviewer'}
        ${'interviewer'} | ${'an interviewer'}
        ${'admin'}       | ${'an admin'}
    `('renders correctly for $friendlyName', ({ role }) => {
        const app = renderWithRootState(<App />, { user: { roles: [], currentRole: role } });
        expect(app).toMatchSnapshot();
    });
});
