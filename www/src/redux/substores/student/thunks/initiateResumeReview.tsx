import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { postDocuments, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview } from '../../../../util/serverResponses';

export type InitiateResumeReviewParams = {
    userId: string;
    base64Contents: string;
    tokenAcquirer: TokenAcquirer;
};

type ResumeReviewBody = {
    reviewee: string;
};

type DocumentBody = {
    note: string;
    isReview: boolean;
    userId: string;
    base64Contents: string;
};

const initiateResumeReview = async (params: InitiateResumeReviewParams) => {
    const resumeReviewResult = await postWithToken<ResumeReviewBody, ResumeReview>(postResumeReviews, params.tokenAcquirer, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });

    if (resumeReviewResult?.data === undefined) {
        // TODO: Reject with thunkApi
    }

    const documentResult = await postWithToken<DocumentBody, Document>(postDocuments(resumeReviewResult?.data.id ?? ''), params.tokenAcquirer, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });

    return {
        resumeReview: resumeReviewResult?.data,
        document: documentResult?.data,
    };
};

export default createAsyncThunk('resumeReview/initiate', initiateResumeReview);
