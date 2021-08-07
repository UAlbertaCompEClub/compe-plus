import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';

const DragNDropResume: FC = () => {
    return (
        <Grid container item spacing={4}>
            <Grid container justify='center' item xs={12}>
                <input type='file' aria-label='upload-resume' />
            </Grid>
            <Grid container justify='center' item xs={12}>
                <Typography>{"All resume's are removed from our database one week after review"}</Typography>
            </Grid>
        </Grid>
    );
};

export default DragNDropResume;
