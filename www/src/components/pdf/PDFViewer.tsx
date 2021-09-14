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
    const { filePromise, fileName, viewerConfig, saveOptions, onSave, ...remainingProps } = props;

    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            viewSDKClient.previewFileUsingFilePromise('adobe-dc-view', filePromise(), fileName, viewerConfig ?? {});
            if (onSave !== undefined) {
                viewSDKClient.onSave(onSave, saveOptions);
            }
        });
    }, []);

    return <Box id='adobe-dc-view' height='100%' width='100%' {...remainingProps} />;
};

export default PDFViewer;
