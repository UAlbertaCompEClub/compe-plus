import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingOverlay from '../../../components/LoadingOverlay';
import PDFViewer from '../../../components/pdf/PDFViewer';
import { resetResumeReviewViewer } from '../../../redux/substores/student/slices/resumeReviewViewerSlice';
import { useStudentDispatch, useStudentSelector } from '../../../redux/substores/student/studentHooks';
import getMyDocuments from '../../../redux/substores/student/thunks/getMyDocuments';
import { base64ToArrayBuffer } from '../../../util/helpers';

type ResumeReviewParams = {
    resumeReviewId: string;
};

const ResumeReviewViewer: React.FC = () => {
    const { resumeReviewId } = useParams<ResumeReviewParams>();

    const { currentDocument, isLoading } = useStudentSelector((state) => state.resumeReviewViewer);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useStudentDispatch();

    useEffect(() => {
        dispatch(getMyDocuments({ tokenAcquirer: getAccessTokenSilently, resumeReviewId: resumeReviewId }));
    }, [resumeReviewId]);

    useEffect(() => {
        return () => {
            dispatch(resetResumeReviewViewer());
        };
    }, []);

    const filePromise = async () => {
        if (currentDocument === null) {
            return new ArrayBuffer(0);
        }
        return base64ToArrayBuffer(currentDocument?.base64Contents);
    };

    return (
        <>
            <LoadingOverlay open={isLoading} />
            {currentDocument !== null && (
                <PDFViewer
                    fileName={currentDocument.id}
                    filePromise={filePromise}
                    viewerConfig={{
                        enableFormFilling: false,
                        showAnnotationTools: false,
                        showLeftHandPanel: false,
                    }}
                    flex='1 1 auto'
                    display='flex'
                    flexDirection='column'
                />
            )}
        </>
    );
};
export default ResumeReviewViewer;
