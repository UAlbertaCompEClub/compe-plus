import config from './config';

export const getMe = `${config.server.endpoint}/api/v1/users/me`;
export const getResumeReviews = `${config.server.endpoint}/api/v1/resume-reviews`;

export const postUsers = `${config.server.endpoint}/api/v1/users`;
export const postResumeReviews = `${config.server.endpoint}/api/v1/resume-reviews`;
export const postDocuments = (resumeReviewId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}/documents`;
