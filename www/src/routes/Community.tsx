import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CommunityIcon from '../assets/community.svg';

const Community: FC = () => {
    return (
        <Grid container justify='center' alignItems='center' direction='column' spacing={8} style={{ marginTop: '50px' }}>
            <Grid item>
                <Typography variant='h1'>Community</Typography>
            </Grid>
            <Grid container item justify='center' alignItems='center' direction='column'>
                <Grid item>
                    <img src={CommunityIcon} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='body1' align='center'>
                        Gain access to crowd-sourced resources for interview prep, resume building, and internship applications
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Community;
