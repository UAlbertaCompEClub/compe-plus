import { Button, Card, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import clsx from 'clsx';
import dateFormat from 'dateformat';
import React, { FC, useState } from 'react';

import { ResumeReview } from '../../../util/serverResponses';

type ResumeReviewCardProps = {
    resumeReview: ResumeReview;
};

const ResumeReviewCard: FC<ResumeReviewCardProps> = ({ resumeReview }: ResumeReviewCardProps) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);

    const stateToDisplayNameMap = new Map([
        ['canceled', 'Canceled'],
        ['finished', 'Completed'],
        ['reviewing', 'In review'],
        ['seeking_reviewer', 'Pending'],
    ]);

    return (
        <Card className={classes.currentResumeCard} elevation={0}>
            <Grid container>
                <Grid container alignItems='center' item xs={6}>
                    <Typography>
                        <b>Uploaded on:</b> {dateFormat(new Date(resumeReview.createdAt), 'dddd, mmmm dS yyyy')}
                    </Typography>
                </Grid>
                <Grid container justify='space-around' item xs={3}>
                    {resumeReview.state !== 'finished' && (
                        <Button
                            onClick={() => {
                                window.open(`/resume-review/${resumeReview.id}`, '_blank');
                            }}
                        >
                            View
                        </Button>
                    )}
                    {resumeReview.state === 'seeking_reviewer' && <Button>Cancel review</Button>}
                </Grid>
                <Grid container alignItems='center' justify='flex-end' item xs={3}>
                    <Typography align='right'>{stateToDisplayNameMap.get(resumeReview.state)}</Typography>
                    {resumeReview.state === 'finished' && (
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: isExpanded,
                            })}
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                            aria-label='show more'
                            size='small'
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    )}
                </Grid>

                {resumeReview.state === 'finished' && (
                    <Grid item xs={12}>
                        <Collapse in={isExpanded}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <Typography>
                                        <b>Review completed on:</b> {dateFormat(new Date(resumeReview.updatedAt), 'dddd, mmmm dS yyyy')}
                                    </Typography>
                                    <Typography>
                                        {/* // TODO: Update to reviewer name */}
                                        <b>Reviewer ID:</b> {resumeReview.reviewerId}
                                    </Typography>
                                </Grid>
                                <Grid container justify='flex-end' alignItems='center' item xs={3}>
                                    <Button startIcon={<GetAppIcon />} variant='contained' color='primary'>
                                        Download resume
                                    </Button>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    currentResumeCard: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: theme.spacing(1),
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default ResumeReviewCard;
