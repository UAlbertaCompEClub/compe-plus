import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../redux/substores/student/thunks/getMyResumeReviews';
import ResumeList from './resumeReview/ResumeList';
import UploadResume from './resumeReview/UploadResume';

const ResumeReview: FC = () => {
    const { isUploading } = useStudentSelector((state) => state.resumeReview);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container justify='center' alignItems='center' spacing={8} style={{ marginTop: '10px', minHeight: '75vh' }}>
                <Grid container item justify='center'>
                    <Typography variant='h1'>Resume Review</Typography>
                </Grid>
                {isUploading ? <UploadResume /> : <ResumeList />}
            </Grid>
        </div>
    );
};

export default ResumeReview;
