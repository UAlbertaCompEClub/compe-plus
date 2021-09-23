import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import TitledPage from '../../components/TitledPage';
import { useStudentSelector } from '../../redux/substores/student/studentHooks';
import ResumeList from './resumeReview/ResumeList';
import UploadResume from './resumeReview/UploadResume';

const ResumeReview: FC = () => {
    const { isUploading } = useStudentSelector((state) => state.resumeReview);

    return (
        <TitledPage title='Resume Review'>
            <Grid container item justify='center'>
                {isUploading ? <UploadResume /> : <ResumeList />}
            </Grid>
            <Grid container item justify='center'>
                <Typography variant='body1' paragraph>
                    Please note that uploaded resumes should not be following the co-op format (if such a format exists). This platform is meant to provide resume reviews for students applying outside
                    of PlacePro, and as such should be following &quot;industry standard&quot; resume formats. Please go to the Community page to see the relevant resources for building a resume prior
                    to submitting a resume for review, thank you. 😁 (That being said, if you would like to have your co-op resume reviewed, feel free to upload it regardless 😎)
                </Typography>
            </Grid>
        </TitledPage>
    );
};

export default ResumeReview;
