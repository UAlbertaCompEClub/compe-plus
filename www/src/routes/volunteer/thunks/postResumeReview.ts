import { createAsyncThunk } from '@reduxjs/toolkit';

import { VolunteerDispatch, VolunteerState } from '../../../redux/substores/volunteer/volunteerStore';
import patchWithToken from '../../../util/auth0/patchWithToken';
import postWithToken from '../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../util/auth0/TokenAcquirer';
import { patchMyResumeReview as patchMyResumeReviewEndpoint, postDocument as postDocumentEndpoint } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import { WrappedDocument } from '../../../util/serverResponses';

export type PostResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
    document: string;
    userId: string;
};

export type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

type PostDocumentBody = {
    note: string;
    isReview: boolean;
    userId: string;
    base64Contents: string;
};

export const postResumeReview = async (params: PostResumeReviewParams): Promise<void> => {
    await postWithToken<PostDocumentBody, WrappedDocument>(postDocumentEndpoint(params.resumeReviewId), params.tokenAcquirer, [Scope.UpdateMyDocuments], {
        note: '',
        isReview: true,
        userId: params.userId,
        base64Contents: params.document,
    }).catch(() => {
        throw new Error('Unable to post resume review');
    });

    await patchWithToken<WrappedDocument>(
        patchMyResumeReviewEndpoint(params.resumeReviewId),
        params.tokenAcquirer,
        {
            state: 'finished',
        },
        [Scope.UpdateMyResumeReviews],
    ).catch(() => {
        throw new Error('Unable to mark resume review as finished');
    });
};

export default createAsyncThunk<void, PostResumeReviewParams, AsyncThunkConfig>('reviewResume/postResumeReview', (params, thunkApi) => {
    try {
        postResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
