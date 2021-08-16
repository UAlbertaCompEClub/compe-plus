import { useAuth0 } from '@auth0/auth0-react';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Cancel, CheckCircle } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';

import PDFViewer from '../../../components/pdf/PDFViewer';
import { setIsUploadingResume } from '../../../redux/substores/student/slices/resumeReviewSlice';
import { resetUploadResume, setDocument } from '../../../redux/substores/student/slices/uploadResumeSlice';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentDispatch } from '../../../redux/substores/student/studentStore';
import initiateResumeReview from '../../../redux/substores/student/thunks/initiateResumeReview';
import { arrayBufferToBase64, base64ToArrayBuffer } from '../../../util/helpers';

const handleOnFileSelected = async (dispatch: StudentDispatch, files?: FileList | null) => {
    // TODO: Improve error handling
    if (files === undefined || files === null) {
        alert('No file selected');
        return;
    }
    if (files?.length !== 1) {
        alert('You can only select 1 file');
        return;
    }
    const pdfFile = files[0];
    if (pdfFile.type !== 'application/pdf') {
        alert('File selected must be pdf');
        return;
    }

    const file = await pdfFile.arrayBuffer();
    dispatch(setDocument(arrayBufferToBase64(file)));
};

const UploadResume: FC = () => {
    const classes = useStyles();

    const dispatch = useStudentDispatch();

    const { user, getAccessTokenSilently } = useAuth0();

    const { document } = useStudentSelector((state) => state.uploadResume);

    useEffect(() => {
        return () => {
            dispatch(resetUploadResume());
        };
    }, []);

    if (document === null) {
        return (
            <Grid container item xs={12} justify='center'>
                {/* TODO: Replace with react-dropzone */}
                <input type='file' aria-label='upload-resume' onChange={(e) => handleOnFileSelected(dispatch, e.target.files)} />
            </Grid>
        );
    }

    const filePromise = async () => {
        return base64ToArrayBuffer(document);
    };

    return (
        <Grid container item xs={12} spacing={2} justify='center' className={classes.root}>
            <Grid container item xs={12} justify='center'>
                <Typography>Ready to upload?</Typography>
            </Grid>
            <Grid container item sm={12} md={8} justify='center'>
                <PDFViewer fileName='string' filePromise={filePromise} className={classes.pdfContainer} />
            </Grid>
            <Grid container item xs={12} justify='center'>
                <span>
                    <IconButton aria-label='cancel' onClick={() => dispatch(setIsUploadingResume(false))}>
                        <Cancel />
                    </IconButton>
                    <IconButton
                        aria-label='confirm'
                        onClick={() =>
                            dispatch(
                                initiateResumeReview({
                                    base64Contents: document,
                                    tokenAcquirer: getAccessTokenSilently,
                                    userId: user?.sub ?? '',
                                }),
                            )
                        }
                    >
                        <CheckCircle />
                    </IconButton>
                </span>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    pdfContainer: {
        minHeight: '60vh',
    },
});

export default UploadResume;
