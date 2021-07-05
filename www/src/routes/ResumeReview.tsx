import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { FC } from 'react';

import UploadResumeIcon from '../assets/add_resume.svg';
import FeedbackIcon from '../assets/conversation.svg';
import ResumesIcon from '../assets/documents.svg';

const UnauthenticatedContent: FC = () => (
    <Grid container item direction='column' spacing={3}>
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
                    Receive the feedback and iterate on your resume
                </Typography>
            </Grid>
        </Grid>
    </Grid>
);

const AuthenticatedContent: FC = () => (
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
);

const ResumeReview: FC = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Resume Review</Typography>
                </Grid>
                {isAuthenticated ? <AuthenticatedContent /> : <UnauthenticatedContent />}
            </Grid>
        </div>
    );
};

export default ResumeReview;
