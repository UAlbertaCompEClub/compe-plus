import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';

import ViewSDKClient from './ViewerSDKClient';

// TODO: Modify to properly pass necessary props to make get resume from api
type PDFViewerProps = {
    id: string;
};

const PDFViewer: FC<PDFViewerProps> = () => {
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
