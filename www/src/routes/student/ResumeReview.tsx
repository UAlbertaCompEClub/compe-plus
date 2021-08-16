import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './resumeReview/NoResumes';
import UploadResume from './resumeReview/UploadResume';

const ResumeReview: FC = () => {
    const { path } = useRouteMatch();

    const { resumeReviews } = useStudentSelector((state) => state.resumeReview);

    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    useEffect(() => {
        // TODO: display upload button if there are no resume reviews
        console.debug(resumeReviews);
    }, [resumeReviews]);

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
