import { useAuth0 } from '@auth0/auth0-react';
import { Button, ButtonGroup, CircularProgress, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import dateFormat from 'dateformat';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import claimResumeReviews from '../../redux/substores/volunteer/thunks/claimResumeReviews';
import getAvailableResumeReviews from '../../redux/substores/volunteer/thunks/getAvailableResumeReviews';
import getReviewingResumeReviews from '../../redux/substores/volunteer/thunks/getReviewingResumeReviews';
import unclaimResumeReviews from '../../redux/substores/volunteer/thunks/unclaimResumeReviews';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';
import { ResumeReviewWithName as RRWN } from '../../util/serverResponses';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))(TableRow);

interface Action {
    name: string;
    func: (resumeReview: RRWN) => void;
}

interface ResumeReviewTableProps {
    resumes: RRWN[];
    actions: Action[];
}

const ResumeReviewTable: FC<ResumeReviewTableProps> = (props: ResumeReviewTableProps) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Uploaded On</StyledTableCell>
                        <StyledTableCell align='right'>Actions</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.resumes.map((resume) => {
                        return (
                            <StyledTableRow key={resume.id}>
                                <StyledTableCell component='th' scope='row'>
                                    {resume.revieweeName}
                                </StyledTableCell>
                                <StyledTableCell>{dateFormat(new Date(resume.createdAt), 'dddd, mmmm dS yyyy')}</StyledTableCell>
                                <StyledTableCell align='right'>
                                    <ButtonGroup>
                                        {props.actions.map((action) => {
                                            return (
                                                <Button key={action.name} onClick={() => action.func(resume)}>
                                                    {action.name}
                                                </Button>
                                            );
                                        })}
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const ResumeReview: FC = () => {
    const { availableResumes, reviewingResumes, availableIsLoading, reviewingIsLoading, shouldReload } = useVolunteerSelector((state) => state.resumeReview);
    const { getAccessTokenSilently, user } = useAuth0();
    const dispatch = useVolunteerDispatch();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (shouldReload) {
            dispatch(getAvailableResumeReviews({ tokenAcquirer: getAccessTokenSilently }));
        }
    }, [shouldReload]);

    useEffect(() => {
        if (user?.sub !== undefined && shouldReload) {
            dispatch(getReviewingResumeReviews({ tokenAcquirer: getAccessTokenSilently, userId: user.sub }));
        }
    }, [user, shouldReload]);

    const availableTableActions: Action[] = [
        {
            name: 'Claim',
            func: (resumeReview: RRWN) => {
                if (reviewingResumes.length + 1 > 3) {
                    alert("You can't claim more than 3 resumes at once. Start reviewing some of them.");
                    return;
                }
                if (user?.sub !== undefined) {
                    dispatch(claimResumeReviews({ tokenAcquirer: getAccessTokenSilently, userId: user.sub, resumeReviewId: resumeReview.id }));
                }
            },
        },
    ];
    const reviewingTableActions: Action[] = [
        { name: 'Review resume', func: (resumeReview: RRWN) => history.push(`/resume-review/${resumeReview.id}`) },
        { name: 'Unclaim', func: (resumeReview: RRWN) => dispatch(unclaimResumeReviews({ tokenAcquirer: getAccessTokenSilently, resumeReviewId: resumeReview.id })) },
    ];

    return (
        <Grid container justify='center' alignItems='center' direction='column' className={classes.pageGrid}>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column'>
                <Typography variant='h1'>Currently Reviewing</Typography>
                <Grid container justify='flex-start' alignItems='flex-start' className={classes.wrapper}>
                    {reviewingIsLoading && (
                        <Grid container justify='center' alignItems='flex-start'>
                            <CircularProgress />
                        </Grid>
                    )}
                    {!reviewingIsLoading && reviewingResumes.length == 0 && (
                        <Typography>You haven&apos;t claimed any resumes to review yet. Claim one of the available resumes below to get started.</Typography>
                    )}
                    {!reviewingIsLoading && reviewingResumes.length > 0 && <ResumeReviewTable resumes={reviewingResumes} actions={reviewingTableActions} />}
                </Grid>
            </Grid>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column'>
                <Typography variant='h1'>Available Resumes</Typography>

                <Grid container justify='flex-start' alignItems='flex-start' className={classes.wrapper}>
                    {availableIsLoading && (
                        <Grid container justify='center' alignItems='flex-start'>
                            <CircularProgress />
                        </Grid>
                    )}
                    {!availableIsLoading && availableResumes.length == 0 && <Typography>There are no available resumes to review. Check back later.</Typography>}
                    {!availableIsLoading && availableResumes.length > 0 && <ResumeReviewTable resumes={availableResumes} actions={availableTableActions} />}
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    wrapper: {
        marginTop: 25,
        marginBottom: 25,
    },
    pageGrid: {
        padding: 50,
    },
});

export default ResumeReview;
