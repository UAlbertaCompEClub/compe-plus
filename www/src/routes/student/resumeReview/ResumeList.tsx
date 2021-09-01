import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';

import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyResumeReviews from '../../../redux/substores/student/thunks/getMyResumeReviews';
import NoResumes from './NoResumes';
import ResumeReviewCard from './ResumeReviewCard';

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

    const activeResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'seeking_reviewer' || resumeReview.state === 'reviewing');
    const activeResume = activeResumes.length > 0 ? activeResumes[0] : null;
    const submittedResumes = resumeReviews.filter((resumeReview) => resumeReview.state === 'finished' || resumeReview.state === 'canceled');

    return (
        <Box display='flex' flexDirection='column' width='100%'>
            <section className={classes.section}>
                <Typography variant='h2' className={classes.sectionTitle}>
                    Current resume
                </Typography>
                {activeResume !== null ? <ResumeReviewCard resumeReview={activeResume} /> : <Typography>You have not submitted any resume for review</Typography>}
            </section>
            <section className={classes.section}>
                <Typography variant='h2' className={classes.sectionTitle}>
                    Submitted resumes
                </Typography>
                {submittedResumes.length > 0 ? (
                    submittedResumes.map((submittedResume) => <ResumeReviewCard key={submittedResume.id} resumeReview={submittedResume} />)
                ) : (
                    <Typography>You have no submitted resumes</Typography>
                )}
            </section>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    section: {
        marginBottom: theme.spacing(8),
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
    },
}));

export default ResumeList;
