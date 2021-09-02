import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { postDocument, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview, WrappedDocument, WrappedResumeReview } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

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

type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

type PayloadCreatorReturn = {
    resumeReview?: ResumeReview;
    document?: Document;
};

export const initiateResumeReview = async (params: InitiateResumeReviewParams): Promise<PayloadCreatorReturn> => {
    const resumeReviewResult = await postWithToken<ResumeReviewBody, WrappedResumeReview>(postResumeReviews, params.tokenAcquirer, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    }).catch(() => {
        throw new Error('Unable to create resume review object');
    });

    const documentResult = await postWithToken<DocumentBody, WrappedDocument>(postDocument(resumeReviewResult?.data.resumeReview.id ?? ''), params.tokenAcquirer, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    }).catch(() => {
        throw new Error('Unable to upload document');
    });

    return {
        resumeReview: resumeReviewResult?.data.resumeReview,
        document: documentResult?.data.document,
    };
};

export default createAsyncThunk<PayloadCreatorReturn, InitiateResumeReviewParams, AsyncThunkConfig>('resumeReview/initiate', (params, thunkApi) => {
    try {
        return initiateResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
