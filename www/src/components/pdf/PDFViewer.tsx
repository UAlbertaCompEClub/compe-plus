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
            viewSDKClient.previewFileUsingFilePromise('adobe-dc-view', props.filePromise(), props.fileName, {
                showAnnotationTools: true,
                enableFormFilling: true,
                showLeftHandPanel: false,
            });
        });
    }, []);

    return <Grid item id='adobe-dc-view' style={{ height: '100%' }} className={props.className} />;
};

export default PDFViewer;
