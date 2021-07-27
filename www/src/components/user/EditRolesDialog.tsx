import { DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeEditRolesDialog, setCurrentRole } from '../../redux/slices/userSlice';
import theme from '../../styles/theme';

const EditRolesDialog: FC = () => {
    const dispatch = useAppDispatch();

    const { isEditRolesDialogOpen, currentRole } = useAppSelector((state) => state.user);

    const classes = useStyles();

    return (
        <Dialog onClose={() => dispatch(closeEditRolesDialog())} open={isEditRolesDialogOpen}>
            <DialogTitle>Edit Roles</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.dialog_content}>Resume Reviewer</DialogContentText>
            </DialogContent>
            <Switch checked={currentRole === 'student'} onChange={() => dispatch(setCurrentRole('student'))} inputProps={{ 'aria-label': 'Toggle student role' }} />
            <DialogContent>
                <DialogContentText className={classes.dialog_content}>Interviwer</DialogContentText>
            </DialogContent>
            <Switch checked={currentRole === 'volunteer'} onChange={() => dispatch(setCurrentRole('volunteer'))} inputProps={{ 'aria-label': 'Toggle volunteer role' }} />
        </Dialog>
    );
};
const useStyles = makeStyles(() => ({
    dialog_content: { color: theme.palette.text.primary },
}));

export default EditRolesDialog;
