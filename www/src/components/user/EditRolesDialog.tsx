import { DialogContent } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';

function EditRolesDialog() {
    const [isopen, setisopen] = useState(false);
    const [isStudent, setisStudent] = useState(false);
    const [isUser, setisUser] = useState(false);
    // const [isopen, setisopen] = useState(false)
    // function openDialog() {
    //     setisopen(true);
    // }
    return (
        <>
            <Dialog onClose={() => setisopen(false)} aria-labelledby='simple-dialog-title' open={isopen}>
                <DialogTitle id='simple-dialog-title'>Edit Roles</DialogTitle>
                <DialogContent>
                    <DialogContentText id='simple-dialog-title'>Resume Reviewer</DialogContentText>
                </DialogContent>
                <Switch checked={isStudent} onChange={(e) => setisStudent(e.target.checked)} name='checkedA' inputProps={{ 'aria-label': 'secondary checkbox' }} />
                <DialogContent>
                    <DialogContentText id='simple-dialog-title'>Interviwer</DialogContentText>
                </DialogContent>
                <Switch checked={isUser} onChange={(e) => setisUser(e.target.checked)} name='checkedA' inputProps={{ 'aria-label': 'secondary checkbox' }} />
            </Dialog>
            <Button variant='contained' onClick={(e) => setisopen(true)}>
                Edit Roles{' '}
            </Button>
        </>
    );
}
export default EditRolesDialog;
