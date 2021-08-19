import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

type LoadingOverlayProps = {
    open: boolean;
};

const LoadingOverlay: FC<LoadingOverlayProps> = (props: LoadingOverlayProps) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
};

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default LoadingOverlay;
