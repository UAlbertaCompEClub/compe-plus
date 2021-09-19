import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';

type AlertErrorProps = {
    errorMessage: string | null;
};

const AlertError: React.FC<AlertErrorProps> = ({ errorMessage }: AlertErrorProps) => {
    const [isOpen, setIsOpen] = useState(errorMessage !== null);

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (errorMessage !== null) {
            setIsOpen(true);
        }
    }, [errorMessage]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6_000}
            onClose={() => setIsOpen(false)}
            message={errorMessage}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            action={
                <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            }
        />
    );
};

export default AlertError;
