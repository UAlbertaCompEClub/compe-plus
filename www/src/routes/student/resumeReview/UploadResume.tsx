import Grid from '@material-ui/core/Grid';
import React, { FC, useEffect } from 'react';

import PDFViewer from '../../../components/pdf/PDFViewer';
import { resetUploadResume, setDocument } from '../../../redux/substores/student/slices/uploadResumeSlice';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import { StudentDispatch } from '../../../redux/substores/student/studentStore';
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
    const dispatch = useStudentDispatch();

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
        <Grid container item xs={12}>
            <PDFViewer fileName='string' filePromise={filePromise} />
        </Grid>
    );
};

export default UploadResume;
