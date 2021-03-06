import { createAsyncThunk } from '@reduxjs/toolkit';

import { VolunteerDispatch, VolunteerState } from '../../../redux/substores/volunteer/volunteerStore';
import fetchWithToken from '../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../util/auth0/TokenAcquirer';
import { getMyDocuments as getMyDocumentsEndpoint } from '../../../util/endpoints';
import Scope from '../../../util/scopes';
import { WrappedDocuments } from '../../../util/serverResponses';

export type GetMyDocumentsParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
};

export type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getMyDocuments = async (params: GetMyDocumentsParams): Promise<WrappedDocuments> => {
    const resumeReviewResult = await fetchWithToken<WrappedDocuments>(getMyDocumentsEndpoint(params.resumeReviewId), params.tokenAcquirer, [Scope.ReadMyDocuments]).catch(() => {
        throw new Error('Unable to fetch documents');
    });
    return resumeReviewResult?.data ?? { documents: [] };
};

export default createAsyncThunk<WrappedDocuments, GetMyDocumentsParams, AsyncThunkConfig>('reviewResume/getMyDocuments', (params, thunkApi) => {
    try {
        return getMyDocuments(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
