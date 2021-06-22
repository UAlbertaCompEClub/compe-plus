import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import BookInterviewIcon from '../assets/book_interview.svg';
import MockInterviewIcon from '../assets/mock_interview1.svg';

const MockInterview: FC = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid item>
                    <Typography align='center' variant='h1'>
                        Interview Booking
                    </Typography>
                </Grid>
                <Grid container item direction='column' spacing={3}>
                    <Grid container item spacing={3}>
                        <Grid container item justify='center' xs={6}>
                            <img src={BookInterviewIcon} />
                        </Grid>
                        <Grid container item justify='center' xs={6}>
                            <img src={MockInterviewIcon} />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <Typography align='center' variant='body1'>
                                Book for an available interview slot
                            </Typography>
                        </Grid>
                        <Grid container item justify='center' xs={6}>
                            <Grid item xs={6}>
                                <Typography align='center' variant='body1'>
                                    Meet with a trained Interviewer and practice communicating your thoughts
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default MockInterview;
