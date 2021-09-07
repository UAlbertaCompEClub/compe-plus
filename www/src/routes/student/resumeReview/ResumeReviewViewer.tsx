import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingOverlay from '../../../components/LoadingOverlay';
import PDFViewer from '../../../components/pdf/PDFViewer';
import { resetResumeReviewViewer } from '../../../redux/substores/student/slices/resumeReviewViewerSlice';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyDocuments from '../../../redux/substores/student/thunks/getMyDocuments';
import { base64ToArrayBuffer } from '../../../util/helpers';

type ResumeReviewParams = {
    resumeReviewId: string;
};

const ResumeReviewViewer: React.FC = () => {
    const classes = useStyles();

    const { resumeReviewId } = useParams<ResumeReviewParams>();

    const { currentDocument, isLoading } = useStudentSelector((state) => state.resumeReviewViewer);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyDocuments({ tokenAcquirer: getAccessTokenSilently, resumeReviewId: resumeReviewId }));
    }, [resumeReviewId]);

    useEffect(() => {
        return () => {
            dispatch(resetResumeReviewViewer());
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
            <Grid item xs={12}>
                {currentDocument !== null && (
                    <PDFViewer
                        fileName={currentDocument.id}
                        filePromise={filePromise}
                        viewerConfig={{
                            enableFormFilling: false,
                            showAnnotationTools: false,
                            showLeftHandPanel: false,
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

export default ResumeReviewViewer;
