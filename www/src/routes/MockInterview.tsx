import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import BookInterviewIcon from '../assets/book_interview.svg';
import MockInterviewIcon from '../assets/mock_interview1.svg';

const MockInterview: FC = () => {
    return (
        <Grid container justify='center' alignItems='center' direction='column' spacing={8} style={{ marginTop: '50px' }}>
            <Grid item>
                <Typography variant='h1'>Interview Booking</Typography>
            </Grid>
            <Grid container item direction='column' spacing={2}>
                <Grid container item spacing={3}>
                    <Grid container item justify='center' xs={6}>
                        <img src={BookInterviewIcon} />
                    </Grid>
                    <Grid container item justify='center' xs={6}>
                        <img src={MockInterviewIcon} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
                        <Typography align='center' variant='body1'>
                            Book for an available interview slot
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='center' variant='body1'>
                            Meet with a trained Interviewer and practice communicating your thoughts
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MockInterview;
