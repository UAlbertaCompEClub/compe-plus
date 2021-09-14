import { Box } from '@material-ui/core';
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
    viewerConfig?: ViewerConfig;
    saveOptions?: SaveOptions;
    onSave?: (arrayBuffer: ArrayBuffer) => void;
} & React.ComponentProps<typeof Box>;

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

    return <Box id='adobe-dc-view' height='100%' width='100%' {...props} />;
};

export default PDFViewer;
