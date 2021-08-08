import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { postDocuments, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview } from '../../../../util/serverResponses';
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

const initiateResumeReview = async (params: InitiateResumeReviewParams, thunkAPI: BaseThunkAPI<StudentState, unknown, StudentDispatch, string>) => {
    const resumeReviewResult = await postWithToken<ResumeReviewBody, ResumeReview>(postResumeReviews, params.tokenAcquirer, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });

    if (resumeReviewResult?.data === undefined) {
        return thunkAPI.rejectWithValue('Unable to create resume review object');
    }

    const documentResult = await postWithToken<DocumentBody, Document>(postDocuments(resumeReviewResult?.data.id ?? ''), params.tokenAcquirer, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });

    if (documentResult?.data === undefined) {
        return thunkAPI.rejectWithValue('Unable to upload document');
    }

    return {
        resumeReview: resumeReviewResult?.data,
        document: documentResult?.data,
    };
};

export default createAsyncThunk<PayloadCreatorReturn, InitiateResumeReviewParams, AsyncThunkConfig>('resumeReview/initiate', initiateResumeReview);
