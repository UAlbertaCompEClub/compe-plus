import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import { IconButton } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppDispatch } from '../../redux/hooks';
import { openEditRolesDialog } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store';
import UserProfile from './UserProfile';

jest.mock('../../redux/hooks');
const useAppDispatchMock = mocked(useAppDispatch, true);

jest.mock('@auth0/auth0-react');
const useAuth0Mock = mocked(useAuth0, true);

describe('UserProfile', () => {
    let dispatchMock: jest.MockedFunction<AppDispatch>;
    let logoutMock: jest.MockedFunction<() => void>;

    beforeEach(() => {
        dispatchMock = jest.fn();
        useAppDispatchMock.mockReturnValue(dispatchMock);

        logoutMock = jest.fn();
        useAuth0Mock.mockReturnValue({
            logout: logoutMock,
        } as unknown as Auth0ContextInterface<User>);
    });

    it('opens the edit roles dialog when the settings option is clicked', () => {
        const result = shallow(<UserProfile />);

        const settingsMenuItem = result.findWhere((component) => component.text() === 'Settings').first();
        settingsMenuItem.prop('onClick')();

        expect(dispatchMock).toBeCalledWith(openEditRolesDialog());
    });

    it('calls logout when the logout option is clicked', () => {
        const result = shallow(<UserProfile />);

        const logoutMenuItem = result.findWhere((component) => component.text() === 'Log out').first();
        logoutMenuItem.prop('onClick')();

        expect(logoutMock).toBeCalled();
    });
});
