import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Link, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

import GiveAvailabilityIcon from '../../assets/give_availability.svg';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import getCalendlys from '../../redux/substores/student/thunks/getCalendlys';

const MockInterview: FC = () => {
    const { calendlyLink, isLoading } = useStudentSelector((state) => state.mockInterview);
    const dispatch = useStudentDispatch();
    const { getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
        if (user?.sub !== undefined) {
            dispatch(getCalendlys({ tokenAcquirer: getAccessTokenSilently, intervieweeId: user.sub }));
        }
    }, [user]);

    const notPaired = (
        <Grid container item xs={6} justify='center'>
            <Typography align='center'>You haven&apos;t been paired with an interviewer yet. Check back again later.</Typography>
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
            <LoadingOverlay open={isLoading} />
            <Grid container justify='center' alignItems='center' style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Mock Interviews</Typography>
                </Grid>
                <Grid container item spacing={4} justify='center'>
                    <Grid container item xs={12} justify='center'>
                        <img src={GiveAvailabilityIcon} />
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Typography align='center'>You are allowed to book one mock interview with a randomly assigned interviewer.</Typography>
                    </Grid>
                    {calendlyLink ? paired : notPaired}
                </Grid>
            </Grid>
        </div>
    );
};

export default MockInterview;
