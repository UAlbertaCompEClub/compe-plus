import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import postWithToken from '../../../../util/auth0/postWithToken';
import { postDocuments, postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { Document, ResumeReview } from '../../../../util/serverResponses';
import tc from '../../../../util/testConstants';
import { StudentDispatch, StudentState } from '../studentStore';
import { initiateResumeReview, InitiateResumeReviewParams } from './initiateResumeReview';

jest.mock('../../../../util/auth0/postWithToken');
const postWithTokenMock = mocked(postWithToken, true);

const getTokenSilentlyMock = jest.fn();
const rejectWithValueMock = jest.fn();
const thunkApiMock = {
    rejectWithValue: rejectWithValueMock,
} as unknown as BaseThunkAPI<StudentState, unknown, StudentDispatch, string>;

const params: InitiateResumeReviewParams = {
    userId: tc.user1.id,
    base64Contents: 'base64',
    tokenAcquirer: getTokenSilentlyMock,
};

it('works on happy path', async () => {
    const postResumeReviewMockResponse = {
        data: tc.resumeReview1,
    };
    const postDocumentMockResponse = {
        data: tc.document1,
    };
    postWithTokenMock.mockResolvedValueOnce(postResumeReviewMockResponse as AxiosResponse<ResumeReview>);
    postWithTokenMock.mockResolvedValueOnce(postDocumentMockResponse as AxiosResponse<Document>);

    const result = await initiateResumeReview(params, thunkApiMock);

    expect(postWithTokenMock).toBeCalledWith(postResumeReviews, getTokenSilentlyMock, [Scope.CreateResumeReviews], {
        reviewee: params.userId,
    });
    expect(postWithTokenMock).toBeCalledWith(postDocuments(tc.resumeReview1.id), getTokenSilentlyMock, [Scope.CreateDocuments], {
        note: '',
        isReview: false,
        userId: params.userId,
        base64Contents: params.base64Contents,
    });
    expect(result).toStrictEqual({
        resumeReview: tc.resumeReview1,
        document: tc.document1,
    });
});
