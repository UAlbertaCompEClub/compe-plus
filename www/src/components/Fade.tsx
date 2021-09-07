// Credit: dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, useRef } from 'react';

import useVisibility from '../hooks/useVisibility';

type FadeProps = {
    children: React.ReactChild;
};

export const Fade: FC<FadeProps> = (props: FadeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useVisibility(ref);

    const classes = useStyles();

    return (
        <Grid container item justify='center' className={clsx(classes.fadeInSection, { [classes.isVisible]: isVisible })} ref={ref}>
            {props.children}
        </Grid>
    );
};

const useStyles = makeStyles({
    fadeInSection: {
        opacity: 0,
        transform: 'translateY(20vh)',
        visibility: 'hidden',
        transition: 'opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)',
    },
    isVisible: {
        opacity: 1,
        transform: 'none',
        visibility: 'visible',
    },
});
