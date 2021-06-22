import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import CommunityIcon from '../assets/community.svg';

const Community: FC = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Grid container alignItems='center' justify='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid item>
                    <Typography align='center' variant='h1'>
                        Community
                    </Typography>
                </Grid>
                <Grid container item justify='center' alignItems='center' direction='column' spacing={4}>
                    <Grid item>
                        <img src={CommunityIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='body1' align='center'>
                            Gain access to crowd-sourced resources for interview prep, resume building, and internship applications
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Community;
