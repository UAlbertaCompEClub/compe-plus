import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';

import ViewSDKClient from './ViewerSDKClient';

export type PDFViewerProps = {
    filePromise: () => Promise<ArrayBuffer>;
    fileName: string;
    className: string;
};

const PDFViewer: FC<PDFViewerProps> = (props: PDFViewerProps) => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFileUsingFilePromise('adobe-dc-view', props.filePromise(), props.fileName, {
                /* Control the viewer customization. */
                showAnnotationTools: true,
                enableFormFilling: true,
                showLeftHandPanel: false,
            });
            /* Register Save API handler */
            viewSDKClient.registerSaveApiHandler();
        });
    }, []);

    return <Grid item id='adobe-dc-view' style={{ height: '100%' }} className={props.className} />;
};

export default PDFViewer;
