import { ResumeReview, User } from './serverResponses';

const user1: User = {
    id: 'google-oauth2|999937999992352499990',
    email: 'email@domain.com',
    ccid: 'myccid',
    program: 'compe',
    year: 4,
    given_name: 'bob',
    family_name: 'saggit',
    full_name: 'bob saggit',
    photo_url: 'asdf.com',
    created_at: '2021-06-14T06:09:19.373404+00:00',
    updated_at: '2021-06-14T06:09:19.373404+00:00',
};

const resumeReview1: ResumeReview = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    revieweeId: user1.id,
    reviewerId: null,
    state: 'seeking_reviewer',
    createdAt: '2021-06-14T06:09:19.373404+00:00',
    updatedAt: '2021-06-14T06:09:19.373404+00:00',
};

export default { user1, resumeReview1 };
