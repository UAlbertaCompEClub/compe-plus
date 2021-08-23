import { DialogContent, FormControlLabel, FormGroup } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeEditRolesDialog, setCurrentRole } from '../../redux/slices/userSlice';

const SettingsDialog: FC = () => {
    const dispatch = useAppDispatch();

    const { isEditRolesDialogOpen, currentRole, roles } = useAppSelector((state) => state.user);

    return (
        <Dialog onClose={() => dispatch(closeEditRolesDialog())} open={isEditRolesDialogOpen}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <Switch
                                checked={currentRole === 'student'}
                                onChange={() => dispatch(setCurrentRole('student'))}
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
                                onChange={() => dispatch(setCurrentRole('volunteer'))}
                                inputProps={{ 'aria-label': 'Toggle volunteer role' }}
                                disabled={!roles.includes('reviewer' || !roles.includes('interviewer'))}
                            />
                        }
                        label='Volunteer'
                    />
                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <Switch
                                checked={currentRole === 'admin'}
                                onChange={() => dispatch(setCurrentRole('admin'))}
                                inputProps={{ 'aria-label': 'Toggle admin role' }}
                                disabled={!roles.includes('admin')}
                            />
                        }
                        label='Admin'
                    />
                </FormGroup>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
