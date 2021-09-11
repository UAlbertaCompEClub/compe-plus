import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';

import ViewSDKClient, { SaveOptions } from './ViewerSDKClient';

type ViewerConfig = {
    showAnnotationTools?: boolean;
    enableFormFilling?: boolean;
    showLeftHandPanel?: boolean;
};

export type PDFViewerProps = {
    filePromise: () => Promise<ArrayBuffer>;
    fileName: string;
    className?: string;
    viewerConfig?: ViewerConfig;
    saveOptions?: SaveOptions;
    onSave?: (arrayBuffer: ArrayBuffer) => void;
};

const PDFViewer: FC<PDFViewerProps> = (props: PDFViewerProps) => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            viewSDKClient.previewFileUsingFilePromise('adobe-dc-view', props.filePromise(), props.fileName, props.viewerConfig ?? {});
            if (props.onSave !== undefined) {
                viewSDKClient.onSave(props.onSave, props.saveOptions);
            }
        });
    }, []);

    return <Grid item id='adobe-dc-view' style={{ height: '100%', width: '100%' }} className={props.className} />;
};

export default PDFViewer;
