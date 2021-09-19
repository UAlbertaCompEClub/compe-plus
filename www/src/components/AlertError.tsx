import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';

type AlertErrorProps = {
    errorMessage: string;
};

const AlertError: React.FC<AlertErrorProps> = ({ errorMessage }: AlertErrorProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6_000}
            onClose={() => setIsOpen(false)}
            message={errorMessage}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            action={
                <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            }
        />
    );
};

export default AlertError;
