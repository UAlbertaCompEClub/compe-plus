import { useAuth0 } from '@auth0/auth0-react';
import { Button, Card, Collapse, Grid, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import dateFormat from 'dateformat';
import React, { FC, useEffect } from 'react';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './NoResumes';

const ResumeList: FC = () => {
    const { resumeReviews } = useStudentSelector((state) => state.resumeReview);

    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
    }, []);

    if (resumeReviews.length === 0) {
        return <NoResumes />;
    }

    const activeResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'seeking_reviewer' || resumeReview.state === 'reviewing');
    const activeResume = activeResumes.length > 0 ? activeResumes[0] : null;
    const submittedResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'finished' || resumeReview.state === 'canceled');

    return (
        <>
            <section>
                <Typography>Current resume</Typography>
                {activeResume !== null ? (
                    <Card>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography>Upload date</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{dateFormat(new Date(activeResume.createdAt), 'dddd, mmmm dS yyyy')}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{activeResume.state}</Typography>
                            </Grid>

                            <Collapse in>
                                <Grid item xs={3}>
                                    <Typography>Last updated on</Typography>
                                    <Typography>Reviewer ID</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>{activeResume.updatedAt}</Typography>
                                    {/* TODO: get reviewer name */}
                                    <Typography>{activeResume.reviewerId}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button startIcon={<GetAppIcon />}>Download resume</Button>
                                </Grid>
                            </Collapse>
                        </Grid>
                    </Card>
                ) : (
                    <Typography>You have not submitted any resume for review</Typography>
                )}
            </section>
            <section>
                <Typography>Submitted resumes</Typography>
                {submittedResumes.map((submittedResume) => (
                    <Card key={submittedResume.id}>{submittedResume.id}</Card>
                ))}
            </section>
        </>
    );
};

export default ResumeList;
