# User Resource

## `GET /users`

Read users.

### Authorization

-   `read:users` — Student, Reviewer, Interviewer, Admin

### Query Parameters

-   `?role=reviewer`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /users`

Create a new user and give them the Student role in Auth0.

### Authorization

This route will only be protected by JWT authentication.

## `GET /users/{user}`

Check if a user exists.

### Authorization

This route will only be protected by JWT authentication.

# Role Resource

## `GET /users/{user}/roles`

Read all roles for a user.

### Authorization

-   `read:roles` — Student, Reviewer, Interviewer, Admin

## `PUT /users/{user}/roles/{role}`

Give a user a new role.

### Authorization

-   `create:roles` — Admin

## `DELETE /users/{user}/roles/{role}`

Revoke a users role.

### Authorization

-   `delete:roles` — Admin

# Resume Review Resource

## `GET /resume-reviews`

Read resume reviews.

### Authorization

-   `read_my:resume_reviews` — Student
-   `read_all:resume_reviews` — Reviewer, Admin

### Query Parameters

-   `?reviewer=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?reviewee=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?state=created`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /resume-reviews`

Create a new resume review.

### Authorization

-   `create:resume_reviews` — Student, Admin

## `PATCH /resume-reviews/{resume-review}`

Update a resume review.

### Authorization

-   `update_my:resume_reviews` — Student, Reviewer
-   `update_all:resume_reviews` — Admin

# Document Resource

## `GET /resume-reviews/{resume-review}/documents`

Read documents for a resume review.

### Authorization

-   `read_my:documents` — Student, Reviewer
-   `read_all:documents` — Admin

### Query Parameters

-   `?is_review=true`
-   `?state=submitted`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /resume-reviews/{resume-review}/documents`

Create a new document for a resume review.

### Authorization

-   `create:documents` — Student, Reviewer, Admin

## `PATCH /resume-reviews/{resume-review}/documents/{document}`

Update a document from a resume review.

### Authorization

-   `update_my:documents` — Student, Reviewer
-   `update_all:documents` — Admin

# Time Slot Resource

## `GET /time-slots`

Read all time slots.

### Authorization

-   `read:time_slots` — Student, Interviewer, Admin

### Query Parameters

-   `?available=true`
-   `?after=2021-03-21T13:08:98Z`

## `POST /time-slots`

Create a new time slot.

### Authorization

-   `create:time_slots` — Interviewer, Admin

## `DELETE /time-slots/{time-slot}`

Delete a time slot.

### Authorization

-   `delete:time_slots` — Interviewer, Admin

# Interview Resource

## `GET /interviews`

Read all interviews.

### Authorization

-   `read_my:interviews` — Student, Interviewer
-   `read_all:interviews` — Admin

### Query Parameters

-   `?interviewer=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?interviewee=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?after=2021-03-21T13:08:98Z`

## `POST /interviews`

Create an interview.

### Authorization

-   `create:interviews` — Student, Admin

## `DELETE /interviews/{interview}`

Delete an interview i.e. cancel it.

### Authorization

-   `delete:interviews` — Student, Interviewer, Admin
