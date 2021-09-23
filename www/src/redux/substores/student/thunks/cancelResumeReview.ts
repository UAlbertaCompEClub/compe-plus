import { createAsyncThunk } from '@reduxjs/toolkit';

import patchWithToken from '../../../../util/auth0/patchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { patchMyResumeReview } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedDocuments } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

export type CancelResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
};

export type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

export const cancelMyResumeReview = async (params: CancelResumeReviewParams): Promise<void> => {
    await patchWithToken<WrappedDocuments>(
        patchMyResumeReview(params.resumeReviewId),
        params.tokenAcquirer,
        {
            state: 'canceled',
        },
        [Scope.UpdateMyResumeReviews],
    ).catch(() => {
        alert('Unable to cancel resume review');
    });
};

export default createAsyncThunk<void, CancelResumeReviewParams, AsyncThunkConfig>('reviewResume/cancelResumeReview', (params, thunkApi) => {
    try {
        return cancelMyResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e as string);
    }
});
