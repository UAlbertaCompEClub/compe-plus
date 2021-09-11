import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import LoadingOverlay from '../../components/LoadingOverlay';
import PDFViewer from '../../components/pdf/PDFViewer';
import { resetResumeReviewEditor } from '../../redux/substores/volunteer/slices/resumeReviewEditorSlice';
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

    const { currentDocument, isLoading, isDone } = useVolunteerSelector((state) => state.resumeReviewEditor);
    const { getAccessTokenSilently, user } = useAuth0();
    const history = useHistory();
    const dispatch = useVolunteerDispatch();

    useEffect(() => {
        dispatch(getMyDocuments({ tokenAcquirer: getAccessTokenSilently, resumeReviewId: resumeReviewId }));
    }, [resumeReviewId]);

    useEffect(() => {
        if (isDone) {
            history.push(RESUME_REVIEW_ROUTE);
        }
    }, [isDone]);

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

    return (
        <Grid container>
            <LoadingOverlay open={isLoading} />
            <Grid item xs={8} className={classes.gridItem}>
                <Typography>{resumeReviewId}</Typography>
            </Grid>
            <Grid container item xs={4} justify='flex-end' className={classes.gridItem}>
                <Button
                    variant='contained'
                    color='primary'
                    endIcon={<DoneIcon />}
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
            <Grid container item xs={12}>
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
                        className={classes.pdfContainer}
                    />
                )}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    gridItem: {
        padding: theme.spacing(1),
    },
    pdfContainer: {
        minHeight: '60vh',
    },
}));

export default ResumeReviewEditor;
