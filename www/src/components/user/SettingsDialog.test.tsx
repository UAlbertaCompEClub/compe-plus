import { Dialog } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import testConstants from '../../util/testConstants';
import SettingsDialog from './SettingsDialog';

jest.mock('../../redux/hooks');

const mockUseAppDispatch = mocked(useAppDispatch);
const mockUseAppSelector = mocked(useAppSelector);
const mockDispatch = jest.fn();

mockUseAppDispatch.mockReturnValue(mockDispatch);

describe('Settings', () => {
    let mockGlobalStore: RootState;
    beforeEach(() => {
        mockGlobalStore = testConstants.globalState;

        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));
    });

    it.each([true, false])('gets the proper dialog state from redux state', (isEditRolesDialogOpen) => {
        mockGlobalStore.user.isSettingsDialogOpen = isEditRolesDialogOpen;
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        const result = shallow(<SettingsDialog />);

        const dialog = result.find(Dialog);
        expect(dialog.props()['open']).toBe(isEditRolesDialogOpen);
    });

    it.each(['student', 'volunteer'])('gets the proper user role from redux state', (currentRole) => {
        mockGlobalStore.user.currentRole = currentRole;
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        const result = shallow(<SettingsDialog />);

        const roleSwitch = result.find({ inputProps: { 'aria-label': `Toggle ${currentRole} role` } });
        expect(roleSwitch.props()['checked']).toBe(true);
    });
});
