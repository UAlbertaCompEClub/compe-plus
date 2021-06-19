import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import UploadResumeIcon from '../assets/add_resume.svg';
import ResumesIcon from '../assets/documents.svg';
import FeedbackIcon from '../assets/conversation.svg';

const ResumeReview: FC = () => {
    return (
        <Grid container justify='center' alignItems='center' direction='column' spacing={8} style={{ marginTop: '50px' }}>
            <Grid item>
                <Typography variant='h1'>Resume Review</Typography>
            </Grid>
            <Grid container item direction='column' spacing={2}>
                <Grid container item spacing={3}>
                    <Grid container item justify='center' xs={4}>
                        <img src={UploadResumeIcon} />
                    </Grid>
                    <Grid container item justify='center' xs={4}>
                        <img src={ResumesIcon} />
                    </Grid>
                    <Grid container item justify='center' xs={4}>
                        <img src={FeedbackIcon} />
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Upload your resume to CompE+
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Have a trained Reviewer make suggestions and comments
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='center' variant='body1'>
                            Recieve the feedback and iterate on your resume
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResumeReview;
