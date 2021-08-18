import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { FC, useEffect } from 'react';

import UploadResumeIcon from '../../assets/add_resume.svg';
import { useStudentDispatch, useStudentSelector } from '../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../redux/substores/student/thunks/getMyResumeReviews';

const ResumeReview: FC = () => {
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

                <Grid container item spacing={4}>
                    <Grid container item xs={12} justify='center'>
                        <img src={UploadResumeIcon} />
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Typography>You have no resumes submitted</Typography>
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Button variant='contained' color='primary'>
                            Submit resume
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResumeReview;
