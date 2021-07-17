/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/
import axios from 'axios';

import config from '../../util/config';
import arrayBufferToBase64 from '../../util/helpers';
declare global {
    interface Window {
        AdobeDC: any;
    }
}

type saveAPIResponse = {
    code: number;
    data: {
        metaData: any;
    };
};

class ViewSDKClient {
    readyPromise: Promise<void>;
    adobeDCView: any;

    constructor() {
        this.readyPromise = new Promise<void>((resolve) => {
            if (window.AdobeDC) {
                resolve();
            } else {
                /* Wait for Adobe Document Services PDF Embed API to be ready */
                document.addEventListener('adobe_dc_view_sdk.ready', () => {
                    resolve();
                });
            }
        });
        this.adobeDCView = undefined;
    }

    ready(): Promise<void> {
        return this.readyPromise;
    }

    previewFile(divId: string, viewerConfig: any): Promise<void> {
        const adobeConfig = {
            /* Pass your registered client id */
            clientId: config.adobePdfId,
        };

        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View(adobeConfig);

        /* Invoke the file preview API on Adobe DC View object */
        const previewFilePromise = this.adobeDCView.previewFile(
            {
                /* Pass information on how to access the file */
                content: {
                    /* Location of file where it is hosted */
                    // TODO: replace empty string with GET endpoint for getting pdf
                    location: {
                        url: '',
                        /*
                    If the file URL requires some additional headers, then it can be passed as follows:-
                    headers: [
                        {
                            key: "<HEADER_KEY>",
                            value: "<HEADER_VALUE>",
                        }
                    ]
                    */
                    },
                },
                /* Pass meta data of file */
                metaData: {
                    /* file name */
                    // TODO: pass in from props
                    fileName: '',
                    /* file ID */
                    // TODO: pass in from props
                    id: '',
                },
            },
            viewerConfig,
        );

        return previewFilePromise;
    }

    previewFileUsingFilePromise(divId: string, filePromise: Promise<void>, fileName: string) {
        /* Initialize the AdobeDC View object */
        this.adobeDCView = new window.AdobeDC.View({
            /* Pass your registered client id */
            clientId: config.adobePdfId,
            /* Pass the div id in which PDF should be rendered */
            divId,
        });

        /* Invoke the file preview API on Adobe DC View object */
        this.adobeDCView.previewFile(
            {
                /* Pass information on how to access the file */
                content: {
                    /* pass file promise which resolve to arrayBuffer */
                    promise: filePromise,
                },
                /* Pass meta data of file */
                metaData: {
                    /* file name */
                    fileName: fileName,
                },
            },
            {},
        );
    }

    registerSaveApiHandler() {
        /* Define Save API Handler */
        const saveApiHandler = (metaData: any, content: any) => {
            return new Promise<saveAPIResponse | void>((resolve) => {
                const formData = new FormData();
                formData.append('file', arrayBufferToBase64(content));

                // TODO: replace empty string with POST endpoint for updating pdf
                axios
                    .post('', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(() => resolve());
            });
        };

        this.adobeDCView.registerCallback(window.AdobeDC.View.Enum.CallbackType.SAVE_API, saveApiHandler, {});
    }

    registerEventsHandler() {
        /* Register the callback to receive the events */
        this.adobeDCView.registerCallback(
            /* Type of call back */
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            /* call back function */
            (event: any) => {
                console.log(event);
            },
            /* options to control the callback execution */
            {
                /* Enable PDF analytics events on user interaction. */
                enablePDFAnalytics: true,
            },
        );
    }
}

export default ViewSDKClient;
