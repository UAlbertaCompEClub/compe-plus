/**
 * Permissions that a role must have to interact with a resource.
 */
enum Scope {
    ReadUsers = 'read:users',
    UpdateUser = 'update:user',
    ReadRoles = 'read:roles',
    CreateRoles = 'create:roles',
    DeleteRoles = 'delete:roles',
    ReadMyResumeReviews = 'read_my:resume_reviews',
    ReadAllResumeReviews = 'read_all:resume_reviews',
    CreateResumeReviews = 'create:resume_reviews',
    UpdateMyResumeReviews = 'update_my:resume_reviews',
    UpdateAllResumeReviews = 'update_all:resume_reviews',
    ReadMyDocuments = 'read_my:documents',
    ReadAllDocuments = 'read_all:documents',
    CreateDocuments = 'create:documents',
    UpdateMyDocuments = 'update_my:documents',
    UpdateAllDocuments = 'update_all:documents',
    ReadTimeSlots = 'read:time_slots',
    CreateTimeSlots = 'create:time_slots',
    DeleteTimeSlots = 'delete:time_slots',
    ReadMyInterviews = 'read_my:interviews',
    ReadAllInterviews = 'read_all:interviews',
    CreateInterviews = 'create:interviews',
    DeleteInterviews = 'delete:interviews',
    ReadAllUsersRoles = 'read:all_users_roles',
    ReadCalendlys = 'read:calendlys',
    CreateCalendlys = 'create:calendlys',
    UpdateCalendlys = 'update:calendlys',
}

export default Scope;
