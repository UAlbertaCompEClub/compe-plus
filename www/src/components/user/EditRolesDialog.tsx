import { Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeEditRolesDialog, openEditRolesDialog, setCurrentRole } from '../../redux/slices/userSlice';
import theme from '../../styles/theme';

const EditRolesDialog: FC = () => {
    const dispatch = useAppDispatch();

    const isEditRolesDialogOpen = useAppSelector((state) => state.user.isEditRolesDialogOpen);

    const [isStudent, setIsStudent] = useState(false);
    const [isVolunteer, setIsVolunteer] = useState(false);
    const classes = useStyles();

    return (
        <>
            <Dialog onClose={() => dispatch(closeEditRolesDialog())} aria-labelledby='simple-dialog-title' open={isEditRolesDialogOpen}>
                <DialogTitle id='simple-dialog-title'>Edit Roles</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialog_content} id='simple-dialog-title'>
                        Resume Reviewer
                    </DialogContentText>
                </DialogContent>
                <Switch checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} inputProps={{ 'aria-label': 'Toggle reviewer role' }} />
                <DialogContent>
                    <DialogContentText className={classes.dialog_content} id='simple-dialog-title'>
                        Interviwer
                    </DialogContentText>
                </DialogContent>
                <Switch checked={isVolunteer} onChange={(e) => setIsVolunteer(e.target.checked)} inputProps={{ 'aria-label': 'Toggle interviewer role' }} />
            </Dialog>
            <Button variant='contained' onClick={() => dispatch(openEditRolesDialog())}>
                Edit Roles
            </Button>
        </>
    );
};
const useStyles = makeStyles(() => ({
    dialog_content: { color: theme.palette.text.primary },
}));

export default EditRolesDialog;
