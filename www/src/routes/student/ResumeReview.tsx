import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { FC } from 'react';

import UploadResumeIcon from '../../assets/add_resume.svg';

const ResumeReview: FC = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Resume Review</Typography>
                </Grid>

                <Grid container item spacing={4}>
                    <Grid container item xs={12} justify='center'>
                        <img src={UploadResumeIcon} />
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Typography>You have no resumes submitted</Typography>
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Button variant='contained' color='primary'>
                            Submit resume
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResumeReview;
