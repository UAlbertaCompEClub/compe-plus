import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { REGISTER_ROUTE } from '../util/constants';
import testConstants from '../util/testConstants';
import UnauthenticatedApp from './Unauthenticated';

jest.mock('../redux/hooks');
const mockUseAppSelector = mocked(useAppSelector, true);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('Unauthenticated', () => {
    let mockGlobalState: RootState;

    beforeEach(() => {
        mockGlobalState = testConstants.globalState;

        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalState));
    });

    it('redirects to register page if the user has not registered', () => {
        mockGlobalState.user.hasRegistered = false;

        shallow(<UnauthenticatedApp />);

        expect(mockHistoryPush).toBeCalledWith(REGISTER_ROUTE);
    });

    it('does not redirect if the user is registered', () => {
        mockGlobalState.user.hasRegistered = true;

        shallow(<UnauthenticatedApp />);

        expect(mockHistoryPush).not.toBeCalledWith(REGISTER_ROUTE);
    });
});
