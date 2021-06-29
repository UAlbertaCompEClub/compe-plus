import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';

function EditRolesDialog() {
    const [isopen, setisopen] = useState(false);
    // function openDialog() {
    //     setisopen(true);
    // }
    return (
        <>
            <Dialog onClose={() => setisopen(false)} aria-labelledby='simple-dialog-title' open={isopen}>
                <DialogTitle id='simple-dialog-title'>Edit Roles</DialogTitle>
            </Dialog>
            <Button variant='contained' onClick={(e) => setisopen(true)}>
                Default{' '}
            </Button>
        </>
    );
}
export default EditRolesDialog;
