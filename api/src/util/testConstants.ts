import type * as s from 'zapatos/schema';

const user1: s.users.JSONSelectable = {
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

const resumeReview1: s.resume_reviews.JSONSelectable = {
    id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
    state: 'seeking_reviewer',
    created_at: '2021-06-07T04:51:55.717971+00:00',
    updated_at: '2021-06-07T04:51:55.717971+00:00',
    reviewee_id: '319ffe68-cac5-470f-9186-33371300c38f',
    reviewer_id: '97cf8fdc-884d-442a-ac71-9922b8f1ee5e',
};

const userRole1: s.user_roles.JSONSelectable = {
    user_id: 'google-oauth2|999937999992352499990',
    role: 'student',
    created_at: '2021-06-07T04:51:55.717971+00:00',
};

const document1: s.documents.JSONSelectable = {
    id: 'a41dbb6d-8957-4d67-a13c-05986cb01916',
    note: 'My note',
    is_review: false,
    user_id: 'google-oauth2|999937999992352499990',
    resume_review_id: '52c2cbdc-e0a8-48e7-9302-92a37e016ab0',
    created_at: '2021-06-14T06:09:19.373404+00:00',
    updated_at: '2021-06-14T06:09:19.373404+00:00',
};

const role1: s.user_roles.JSONSelectable = {
    user_id: 'google-oauth2|999937999992352499990',
    created_at: '2021-06-14T06:09:19.373404+00:00',
    role: 'student',
};

export default { user1, resumeReview1, userRole1, document1, role1 };
