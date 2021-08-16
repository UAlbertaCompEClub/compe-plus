import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';

import UploadResumeIcon from '../../../assets/add_resume.svg';
import { UPLOAD_RESUME_REVIEW_ROUTE } from '../../../util/constants';

const NoResumes: React.FC = () => {
    const history = useHistory();

    return (
        <Grid container item spacing={4}>
            <Grid container item xs={12} justify='center'>
                <img src={UploadResumeIcon} />
            </Grid>
            <Grid container item xs={12} justify='center'>
                <Typography>You have no resumes submitted</Typography>
            </Grid>
            <Grid container item xs={12} justify='center'>
                <Button variant='contained' color='primary' onClick={() => history.push(UPLOAD_RESUME_REVIEW_ROUTE)}>
                    Submit resume
                </Button>
            </Grid>
        </Grid>
    );
};

export default NoResumes;
