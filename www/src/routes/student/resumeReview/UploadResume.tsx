import { useAuth0 } from '@auth0/auth0-react';
import { Container, IconButton, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Cancel, CheckCircle } from '@material-ui/icons';
import React, { FC, useEffect } from 'react';

import PDFViewer from '../../../components/pdf/PDFViewer';
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
        <Grid container item xs={12} justify='center' style={{ height: '100%' }}>
            <Container className={classes.uploadContainer}>
                <Typography>Ready to upload?</Typography>
                <PDFViewer fileName='string' filePromise={filePromise} />
                <span>
                    <IconButton aria-label='cancel' onClick={() => dispatch(resetUploadResume())}>
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
            </Container>
        </Grid>
    );
};

const useStyles = makeStyles({
    uploadContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UploadResume;
