import { useAuth0 } from '@auth0/auth0-react';
import { Button, Card, Collapse, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import dateFormat from 'dateformat';
import React, { FC, useEffect } from 'react';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './NoResumes';

const ResumeList: FC = () => {
    const classes = useStyles();

    const { resumeReviews } = useStudentSelector((state) => state.resumeReview);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    if (resumeReviews.length === 0) {
        return <NoResumes />;
    }

    const stateToDisplayNameMap = new Map([
        ['canceled', 'Canceled'],
        ['finished', 'Completed'],
        ['reviewing', 'In review'],
        ['seeking_reviewer', 'Pending'],
    ]);

    const activeResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'seeking_reviewer' || resumeReview.state === 'reviewing');
    const activeResume = activeResumes.length > 0 ? activeResumes[0] : null;
    const submittedResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'finished' || resumeReview.state === 'canceled');

    return (
        <Grid container item xs={12} justify='center'>
            <Grid item xs={12}>
                <Typography variant='h2'>Current resume</Typography>
                {activeResume !== null ? (
                    <Card className={classes.currentResumeCard}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography>Upload date</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{dateFormat(new Date(activeResume.createdAt), 'dddd, mmmm dS yyyy')}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align='right'>{stateToDisplayNameMap.get(activeResume.state)}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Collapse in>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography>Last update on</Typography>
                                            <Typography>Reviewer ID</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>{dateFormat(new Date(activeResume.updatedAt), 'dddd, mmmm dS yyyy')}</Typography>
                                            {/* TODO: get reviewer name */}
                                            <Typography>{activeResume.reviewerId}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button startIcon={<GetAppIcon />} variant='contained' color='primary'>
                                                Download resume
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Card>
                ) : (
                    <Typography>You have not submitted any resume for review</Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h2'>Submitted resumes</Typography>
                {submittedResumes.map((submittedResume) => (
                    <Card key={submittedResume.id}>{submittedResume.id}</Card>
                ))}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    currentResumeCard: {
        padding: theme.spacing(2),
    },
}));

export default ResumeList;
