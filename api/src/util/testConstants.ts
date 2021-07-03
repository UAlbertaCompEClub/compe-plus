import type * as s from 'zapatos/schema';

const user1: s.users.JSONSelectable = {
    id: '67e8ff47-8c31-4725-885c-e0e40455e7f5',
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

const resumeReview1: s.resume_reviews.JSONSelectable = {
    id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
    state: 'seeking_reviewer',
    created_at: '2021-06-07T04:51:55.717971+00:00',
    updated_at: '2021-06-07T04:51:55.717971+00:00',
    reviewee_id: '319ffe68-cac5-470f-9186-33371300c38f',
    reviewer_id: '97cf8fdc-884d-442a-ac71-9922b8f1ee5e',
};

export default { user1, resumeReview1 };
