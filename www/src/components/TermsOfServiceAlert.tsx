import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { openTermsOfServiceDialog } from '../redux/slices/userSlice';

const TermsOfServiceAlert: FC = () => {
    const { isAuthenticated } = useAuth0();
    const { hasAgreedToTermsOfService } = useAppSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(isAuthenticated && !hasAgreedToTermsOfService);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            if (hasAgreedToTermsOfService) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        }
    }, [hasAgreedToTermsOfService, isAuthenticated]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            action={
                <React.Fragment>
                    <Button color='secondary' size='small' onClick={() => dispatch(openTermsOfServiceDialog())}>
                        Review
                    </Button>
                    <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </React.Fragment>
            }
            message={"You need to review them before you can start using CompE's services."}
        />
    );
};

export default TermsOfServiceAlert;
