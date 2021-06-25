// Credit: dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4

import '../styles/scrollAnimation.css';

import { Grid } from '@material-ui/core';
import React, { FC, useRef } from 'react';

import useVisibility from '../hooks/useVisibility';

type FadeProps = {
    children: React.ReactChild;
};

export const Fade: FC<FadeProps> = (props: FadeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useVisibility(ref);

    return (
        <Grid container item justify='center' className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={ref}>
            {props.children}
        </Grid>
    );
};
