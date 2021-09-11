import { createAsyncThunk } from '@reduxjs/toolkit';

import { VolunteerDispatch, VolunteerState } from '../../../redux/substores/volunteer/volunteerStore';
import patchWithToken from '../../../util/auth0/patchWithToken';
import TokenAcquirer from '../../../util/auth0/TokenAcquirer';
import { patchMyDocument as patchMyDocumentEndpoint } from '../../../util/endpoints';
import Scope from '../../../util/scopes';

export type PatchDocumentParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
    documentId: string;
    document: string;
    userId: string;
};

export type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const patchDocument = async (params: PatchDocumentParams): Promise<void> => {
    await patchWithToken<void>(
        patchMyDocumentEndpoint(params.resumeReviewId, params.documentId),
        params.tokenAcquirer,
        {
            note: '',
            base64Contents: params.document,
        },
        [Scope.UpdateMyDocuments],
    ).catch(() => {
        throw new Error('Unable to patch document');
    });
};

export default createAsyncThunk<void, PatchDocumentParams, AsyncThunkConfig>('reviewResume/patchDocument', (params, thunkApi) => {
    try {
        return patchDocument(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
