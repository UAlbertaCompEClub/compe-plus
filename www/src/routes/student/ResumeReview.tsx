import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import NoResumes from './resumeReview/NoResumes';

const ResumeReview: FC = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Resume Review</Typography>
                </Grid>

                <NoResumes />
            </Grid>
        </div>
    );
};

export default ResumeReview;
