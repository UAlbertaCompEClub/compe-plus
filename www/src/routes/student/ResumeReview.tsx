import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

import TitledPage from '../../components/TitledPage';
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
        <TitledPage title='Resume Review'>
            <Grid container item justify='center'>
                {isUploading ? <UploadResume /> : <ResumeList />}
            </Grid>
        </TitledPage>
    );
};

export default ResumeReview;
