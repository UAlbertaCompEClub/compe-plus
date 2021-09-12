import { DialogContent, FormControlLabel, FormGroup } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeEditRolesDialog, closeUserProfileDialog, setCurrentRole } from '../../redux/slices/userSlice';

const SettingsDialog: FC = () => {
    const dispatch = useAppDispatch();

    const { isSettingsDialogOpen, currentRole, roles } = useAppSelector((state) => state.user);

    const handleOnChange = (role: string) => {
        dispatch(closeEditRolesDialog());
        dispatch(closeUserProfileDialog());
        dispatch(setCurrentRole(role));
    };

    return (
        <Dialog onClose={() => dispatch(closeEditRolesDialog())} open={isSettingsDialogOpen}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <Switch
                                checked={currentRole === 'student'}
                                onChange={() => handleOnChange('student')}
                                inputProps={{ 'aria-label': 'Toggle student role' }}
                                disabled={!roles.includes('student')}
                            />
                        }
                        label='Student'
                    />
                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <Switch
                                checked={currentRole === 'volunteer'}
                                onChange={() => handleOnChange('volunteer')}
                                inputProps={{ 'aria-label': 'Toggle volunteer role' }}
                                disabled={!roles.includes('reviewer' || !roles.includes('interviewer'))}
                            />
                        }
                        label='Volunteer'
                    />
                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <Switch checked={currentRole === 'admin'} onChange={() => handleOnChange('admin')} inputProps={{ 'aria-label': 'Toggle admin role' }} disabled={!roles.includes('admin')} />
                        }
                        label='Admin'
                    />
                </FormGroup>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
