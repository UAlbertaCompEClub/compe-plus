import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import LoadingOverlay from '../../components/LoadingOverlay';
import PDFViewer from '../../components/pdf/PDFViewer';
import useUserContext from '../../hooks/useUserContext';
import { resetResumeReviewEditor } from '../../redux/substores/volunteer/slices/resumeReviewEditorSlice';
import getReviewingResumeReviews from '../../redux/substores/volunteer/thunks/getReviewingResumeReviews';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';
import { RESUME_REVIEW_ROUTE } from '../../util/constants';
import { arrayBufferToBase64, base64ToArrayBuffer } from '../../util/helpers';
import getMyDocuments from './thunks/getMyDocuments';
import patchDocument from './thunks/patchDocument';
import patchResumeReview from './thunks/patchResumeReview';

type ResumeReviewParams = {
    resumeReviewId: string;
};

const ResumeReviewEditor: React.FC = () => {
    const classes = useStyles();

    const { resumeReviewId } = useParams<ResumeReviewParams>();

    const { reviewingResumes, shouldReload, reviewingIsLoading } = useVolunteerSelector((state) => state.resumeReview);
    const { currentDocument, isLoading, isResumeReviewPatched, isDocumentPatched } = useVolunteerSelector((state) => state.resumeReviewEditor);
    const { getAccessTokenSilently, user } = useAuth0();
    const history = useHistory();
    const dispatch = useVolunteerDispatch();
    const userContext = useUserContext();

    const currentResumeReview = reviewingResumes.find((review) => review.id === resumeReviewId);

    useEffect(() => {
        dispatch(getMyDocuments({ tokenAcquirer: getAccessTokenSilently, resumeReviewId: resumeReviewId }));
    }, [resumeReviewId]);

    // Fetch resumeReview object to get reviewee name
    useEffect(() => {
        if (user?.sub !== undefined && shouldReload) {
            dispatch(getReviewingResumeReviews({ tokenAcquirer: getAccessTokenSilently, userId: user.sub }));
        }
    }, [user, shouldReload]);

    useEffect(() => {
        if (isResumeReviewPatched && isDocumentPatched) {
            history.push(RESUME_REVIEW_ROUTE);
        }
    }, [isResumeReviewPatched, isDocumentPatched]);

    useEffect(() => {
        return () => {
            dispatch(resetResumeReviewEditor());
        };
    }, []);

    const filePromise = async () => {
        if (currentDocument === null) {
            return new ArrayBuffer(0);
        }
        return base64ToArrayBuffer(currentDocument?.base64Contents);
    };

    const actionsShouldBeDisabled = !userContext?.hasAgreedToTermsOfService ?? false;

    return (
        <>
            <LoadingOverlay open={isLoading || reviewingIsLoading || (isResumeReviewPatched && !isDocumentPatched)} />
            <Box>
                <Grid container>
                    <Grid container alignItems='center' item xs={8} className={classes.gridItem}>
                        {currentResumeReview && <Typography>{currentResumeReview?.reviewee.fullName}&apos;s resume</Typography>}
                    </Grid>
                    <Grid container item xs={4} justify='flex-end' className={classes.gridItem}>
                        <Button
                            variant='contained'
                            color='primary'
                            endIcon={<DoneIcon />}
                            disabled={actionsShouldBeDisabled}
                            onClick={() =>
                                dispatch(
                                    patchResumeReview({
                                        resumeReviewId,
                                        tokenAcquirer: getAccessTokenSilently,
                                        userId: user?.sub ?? '',
                                    }),
                                )
                            }
                        >
                            Complete review
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {currentDocument !== null && (
                <PDFViewer
                    fileName={currentDocument.id}
                    filePromise={filePromise}
                    viewerConfig={{
                        enableFormFilling: true,
                        showAnnotationTools: true,
                        showLeftHandPanel: true,
                    }}
                    onSave={(arrayBuffer) => {
                        const base64Contents = arrayBufferToBase64(arrayBuffer);
                        dispatch(
                            patchDocument({
                                document: base64Contents,
                                documentId: currentDocument?.id ?? '',
                                resumeReviewId,
                                tokenAcquirer: getAccessTokenSilently,
                                userId: user?.sub ?? '',
                            }),
                        );
                    }}
                    saveOptions={{
                        enableFocusPolling: true, // Auto-saves on focus loss
                    }}
                    flex='1 1 auto'
                    display='flex'
                    flexDirection='column'
                />
            )}
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    gridItem: {
        padding: theme.spacing(1),
    },
}));

export default ResumeReviewEditor;
