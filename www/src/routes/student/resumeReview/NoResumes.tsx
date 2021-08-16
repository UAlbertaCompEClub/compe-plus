import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import UploadResumeIcon from '../../../assets/add_resume.svg';
import { setIsUploadingResume } from '../../../redux/substores/student/slices/resumeReviewSlice';
import { useStudentDispatch } from '../../../redux/substores/student/studentHooks';

const NoResumes: React.FC = () => {
    const dispatch = useStudentDispatch();

    return (
        <Grid container item spacing={4}>
            <Grid container item xs={12} justify='center'>
                <img src={UploadResumeIcon} />
            </Grid>
            <Grid container item xs={12} justify='center'>
                <Typography>You have no resumes submitted</Typography>
            </Grid>
            <Grid container item xs={12} justify='center'>
                <Button variant='contained' color='primary' onClick={() => dispatch(setIsUploadingResume(true))}>
                    Submit resume
                </Button>
            </Grid>
        </Grid>
    );
};

export default NoResumes;
