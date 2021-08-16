import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import NoResumes from './resumeReview/NoResumes';
import UploadResume from './resumeReview/UploadResume';

const ResumeReview: FC = () => {
    const { path } = useRouteMatch();

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Resume Review</Typography>
                </Grid>
                <Switch>
                    <Route exact path={path}>
                        <NoResumes />
                    </Route>

                    <Route path={`${path}/upload`}>
                        <UploadResume />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
};

export default ResumeReview;
