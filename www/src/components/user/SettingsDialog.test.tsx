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

    it.each([true, false])('gets the proper dialog state from redux state', (isSettingsDialogOpen) => {
        mockGlobalStore.user.isSettingsDialogOpen = isSettingsDialogOpen;
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        const result = shallow(<SettingsDialog />);

        const dialog = result.find(Dialog);
        expect(dialog.props()['open']).toBe(isSettingsDialogOpen);
    });

    it.each(['student', 'volunteer', 'admin'])('gets the proper user role from redux state', (currentRole) => {
        mockGlobalStore.user.currentRole = currentRole;
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        const result = shallow(<SettingsDialog />);

        const roleToLabelMap = new Map([
            ['student', 'Student'],
            ['volunteer', 'Volunteer'],
            ['admin', 'Admin'],
        ]);

        const roleSwitch = result.find({ label: roleToLabelMap.get(currentRole) });
        expect(roleSwitch.prop('control').props['checked']).toBe(true);
    });

    it('disables the reviewer and admin switches if user is a student', () => {
        mockGlobalStore.user.currentRole = 'student';
        mockGlobalStore.user.roles = ['student'];
        mockUseAppSelector.mockImplementation((selector) => selector(mockGlobalStore));

        const result = shallow(<SettingsDialog />);

        const volunteerSwitch = result.find({ label: 'Volunteer' });
        expect(volunteerSwitch.prop('control').props['disabled']).toBe(true);

        const adminSwitch = result.find({ label: 'Admin' });
        expect(adminSwitch.prop('control').props['disabled']).toBe(true);
    });
});
