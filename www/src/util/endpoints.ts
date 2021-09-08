import config from './config';

export const getMe = `${config.server.endpoint}/api/v1/users/me`;
export const getResumeReviews = `${config.server.endpoint}/api/v1/resume-reviews`;
export const getUserRole = (userId: string): string => `${config.server.endpoint}/api/v1/users/${encodeURIComponent(userId)}/roles`;
export const getCalendlys = `${config.server.endpoint}/api/v1/calendlys`;

export const postUsers = `${config.server.endpoint}/api/v1/users`;
export const postCalendly = `${config.server.endpoint}/api/v1/calendlys`;

export const postResumeReviews = `${config.server.endpoint}/api/v1/resume-reviews`;
export const patchResumeReviews = (resumeReviewId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}`;
export const patchMyResumeReview = (resumeReviewId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}`;

export const postDocument = (resumeReviewId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}/documents`;
export const getMyDocuments = (resumeReviewId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}/documents`;
export const patchMyDocument = (resumeReviewId: string, documentId: string): string => `${config.server.endpoint}/api/v1/resume-reviews/${resumeReviewId}/documents/${documentId}`;
