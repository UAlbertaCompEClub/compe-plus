import { Dialog, Switch } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import EditRolesDialog from './EditRolesDialog';

jest.mock('../../redux/hooks');

const useAppDispatchMock = mocked(useAppDispatch);
const useAppSelectorMock = mocked(useAppSelector);
const dispatchMock = jest.fn();

useAppDispatchMock.mockReturnValue(dispatchMock);

it.each([true, false])('gets the proper dialog state from redux state', (isEditRolesDialogOpen) => {
    const state = {
        user: {
            isEditRolesDialogOpen,
        },
    } as RootState;

    useAppSelectorMock.mockImplementationOnce((selector) => selector(state));

    const result = shallow(<EditRolesDialog />);

    const dialog = result.find(Dialog);
    expect(dialog.props()['open']).toBe(isEditRolesDialogOpen);
});

it.each(['student', 'volunteer'])('gets the proper user role from redux state', (currentRole) => {
    const state = {
        user: { currentRole },
    } as RootState;

    useAppSelectorMock.mockImplementationOnce((selector) => selector(state));

    const result = shallow(<EditRolesDialog />);

    const roleSwitch = result.find({ inputProps: { 'aria-label': `Toggle ${currentRole} role` } });
    expect(roleSwitch.props()['checked']).toBe(true);
});
