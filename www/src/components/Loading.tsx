import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC } from 'react';

type LoadingProps = {
    open: boolean;
};

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
    const classes = useStyles();
    return <CircularProgress color='inherit' className={clsx({ [classes.hidden]: !props.open })} />;
};

const useStyles = makeStyles({
    hidden: {
        display: 'none',
    },
});

export default Loading;
