/**
 * Permissions that a role must have to interact with a resource.
 */
enum Scope {
    ReadMyResumeReviews = `read_my:resume_review`,
    ReadAllResumeReviews = `read_all:resume_review`,
    CreateResumeReviews = `create:resume_review`,
}

export default Scope;
