import { DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC, useState } from 'react';

import theme from '../../styles/theme';

const EditRolesDialog: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isStudent, setisStudent] = useState(false);
    const [isUser, setisUser] = useState(false);
    const classes = useStyles();

    return (
        <>
            <Dialog onClose={() => setIsOpen(false)} aria-labelledby='simple-dialog-title' open={isOpen}>
                <DialogTitle id='simple-dialog-title'>Edit Roles</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialog_content} id='simple-dialog-title'>
                        Resume Reviewer
                    </DialogContentText>
                </DialogContent>
                <Switch checked={isStudent} onChange={(e) => setisStudent(e.target.checked)} inputProps={{ 'aria-label': 'Toggle reviewer role' }} />
                <DialogContent>
                    <DialogContentText className={classes.dialog_content} id='simple-dialog-title'>
                        Interviwer
                    </DialogContentText>
                </DialogContent>
                <Switch checked={isUser} onChange={(e) => setisUser(e.target.checked)} inputProps={{ 'aria-label': 'Toggle interviewer role' }} />
            </Dialog>
            <Button variant='contained' onClick={() => setIsOpen(true)}>
                Edit Roles
            </Button>
        </>
    );
};
const useStyles = makeStyles(() => ({
    dialog_content: { color: theme.palette.text.primary },
}));

export default EditRolesDialog;
