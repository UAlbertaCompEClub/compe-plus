import { Grid } from '@material-ui/core';
import React, { FC } from 'react';

import AlertError from '../../components/AlertError';
import TitledPage from '../../components/TitledPage';
import { useStudentSelector } from '../../redux/substores/student/studentHooks';
import ResumeList from './resumeReview/ResumeList';
import UploadResume from './resumeReview/UploadResume';

const ResumeReview: FC = () => {
    const { isUploading, errorMessage } = useStudentSelector((state) => state.resumeReview);

    return (
        <TitledPage title='Resume Review'>
            <AlertError errorMessage={errorMessage} />
            <Grid container item justify='center'>
                {isUploading ? <UploadResume /> : <ResumeList />}
            </Grid>
        </TitledPage>
    );
};

export default ResumeReview;
