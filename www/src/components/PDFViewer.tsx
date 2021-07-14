import React, { FC } from 'react';
import { useEffect } from 'react';

import ViewSDKClient from './pdf/ViewerSDKClient';

const PDFViewer: FC = () => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile('adobe-dc-view', {
                /* Control the viewer customization. */
                showAnnotationTools: true,
                enableFormFilling: true,
            });
            /* Register Save API handler */
            viewSDKClient.registerSaveApiHandler();
        });
    }, []);

    return <div id='adobe-dc-view' style={{ height: '100%' }} />;
};

export default PDFViewer;
