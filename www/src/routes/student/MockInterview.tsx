import { Grid, Link, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import GiveAvailabilityIcon from '../../assets/give_availability.svg';

const MockInterview: FC = () => {
    // TODO hit backend to see if they have been paired with an interviewer yet
    const calendlyLink = '';

    const notPaired = (
        <Grid container item xs={6} justify='center'>
            <Typography>You haven&apos;t been paired with an interviewer yet. Check back again later.</Typography>
        </Grid>
    );

    const paired = (
        <Grid container item xs={6} justify='center'>
            <Typography align='center'>
                You have been paired with an interviewer. Go to there <Link href={calendlyLink}>Calendly link</Link> to find a time for a mock interview.
            </Typography>
        </Grid>
    );

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Mock Interviews</Typography>
                </Grid>
                <Grid container item spacing={4} justify='center'>
                    <Grid container item xs={12} justify='center'>
                        <img src={GiveAvailabilityIcon} />
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Typography>You are allowed to book one mock interview with a randomly assigned interviewer.</Typography>
                    </Grid>
                    {calendlyLink ? paired : notPaired}
                </Grid>
            </Grid>
        </div>
    );
};

export default MockInterview;
