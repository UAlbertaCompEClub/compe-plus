import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
    resumeReviewId: string;
}

const ResumeReviewEditor: FC = () => {
    const { resumeReviewId } = useParams<ParamTypes>();
    console.log(resumeReviewId);
    return <p>🚧 Work in progress 🚧</p>;
};

export default ResumeReviewEditor;
