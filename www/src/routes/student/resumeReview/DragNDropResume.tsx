import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';

import { useAppDispatch } from '../../../redux/hooks';
import { AppDispatch } from '../../../redux/store';

const handleOnFileSelected = async (dispatch: AppDispatch, files?: FileList | null) => {
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
    }

    const file = await pdfFile.arrayBuffer();
    // TODO: encode array buffer to base64 and add to slice
};

const DragNDropResume: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Grid container item spacing={4}>
            <Grid container justify='center' item xs={12}>
                <input type='file' aria-label='upload-resume' onChange={(e) => handleOnFileSelected(dispatch, e.target.files)} />
            </Grid>
            <Grid container justify='center' item xs={12}>
                <Typography>{"All resume's are removed from our database one week after review"}</Typography>
            </Grid>
        </Grid>
    );
};

export default DragNDropResume;
