import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';

import ViewSDKClient from './ViewerSDKClient';

const PDFViewer: FC = () => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile('adobe-dc-view', {
                /* Control the viewer customization. */
                showAnnotationTools: true,
                enableFormFilling: true,
                showLeftHandPanel: false,
            });
            /* Register Save API handler */
            viewSDKClient.registerSaveApiHandler();
        });
    }, []);

    return <Grid item id='adobe-dc-view' style={{ height: '100%' }} />;
};

export default PDFViewer;
