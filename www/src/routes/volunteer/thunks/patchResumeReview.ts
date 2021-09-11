import { createAsyncThunk } from '@reduxjs/toolkit';

import { VolunteerDispatch, VolunteerState } from '../../../redux/substores/volunteer/volunteerStore';
import patchWithToken from '../../../util/auth0/patchWithToken';
import TokenAcquirer from '../../../util/auth0/TokenAcquirer';
import { patchMyResumeReview as patchMyResumeReviewEndpoint } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import { WrappedDocument } from '../../../util/serverResponses';

export type PatchResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
    userId: string;
};

export type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const patchResumeReview = async (params: PatchResumeReviewParams): Promise<void> => {
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

export default createAsyncThunk<void, PatchResumeReviewParams, AsyncThunkConfig>('reviewResume/patchResumeReview', (params, thunkApi) => {
    try {
        return patchResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
