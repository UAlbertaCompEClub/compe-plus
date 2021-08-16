import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { FC, useEffect } from 'react';

import { resetUploadResume, setDocument } from '../../../redux/substores/student/slices/uploadResumeSlice';
import { useStudentDispatch } from '../../../redux/substores/student/studentHooks';
import { StudentDispatch } from '../../../redux/substores/student/studentStore';
import { arrayBufferToBase64 } from '../../../util/helpers';

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

    useEffect(() => {
        return () => {
            dispatch(resetUploadResume());
        };
    }, []);

    return (
        <Grid container item spacing={4}>
            <Grid container justify='center' item xs={12}>
                {/* TODO: Replace with react-dropzone */}
                <input type='file' aria-label='upload-resume' onChange={(e) => handleOnFileSelected(dispatch, e.target.files)} />
            </Grid>
        </Grid>
    );
};

export default UploadResume;
