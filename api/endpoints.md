# User Resource

## `GET /users`

Read users.

### Authorization

-   `read:user` — Student, Reviewer, Interviewer, Admin

### Query Parameters

-   `?role=reviewer`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /users`

Create a new user and give them the User role in Auth0.

### Authorization

This route will only be protected by JWT authentication.

# Role Resource

## `GET /users/{user}/roles`

Read all roles for a user.

### Authorization

-   `read:role` — Student, Reviewer, Interviewer, Admin

## `PUT /users/{user}/roles/{role}`

Give a user a new role.

### Authorization

-   `create:role` — Admin

## `DELETE /users/{user}/roles/{role}`

Revoke a users role.

### Authorization

-   `delete:role` — Admin

# Resume Review Resource

## `GET /resume-reviews`

Read resume reviews.

### Authorization

-   `read_my:resume_review` — Student
-   `read_all:resume_review` — Reviewer, Admin

### Query Parameters

-   `?reviewer=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?reviewee=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?state=created`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /resume-reviews`

Create a new resume review.

### Authorization

-   `create:resume_review` — Student, Admin

## `PATCH /resume-reviews/{resume-review}`

Update a resume review.

### Authorization

-   `update_my:resume_review` — Student, Reviewer
-   `update_all:resume_review` — Admin

# Document Resource

## `GET /resume-reviews/{resume-review}/documents`

Read documents for a resume review.

### Authorization

-   `read_my:document` — Student, Reviewer
-   `read_all:document` — Admin

### Query Parameters

-   `?is_review=true`
-   `?state=submitted`
-   `?id=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## `POST /resume-reviews/{resume-review}/documents`

Create a new document for a resume review.

### Authorization

-   `create:document` — Student, Reviewer, Admin

## `PATCH /resume-reviews/{resume-review}/documents/{document}`

Update a document from a resume review.

### Authorization

-   `update_my:document` — Student, Reviewer
-   `update_all:document` — Admin

# Time Slot Resource

## `GET /time-slots`

Read all time slots.

### Authorization

-   `read:time_slot` — Student, Interviewer, Admin

### Query Parameters

-   `?available=true`
-   `?after=2021-03-21T13:08:98Z`

## `POST /time-slots`

Create a new time slot.

### Authorization

-   `create:time_slot` — Interviewer, Admin

## `DELETE /time-slots/{time-slot}`

Delete a time slot.

### Authorization

-   `delete:time_slot` — Interviewer, Admin

# Interview Resource

## `GET /interviews`

Read all interviews.

### Authorization

-   `read_my:interview` — Student, Interviewer
-   `read_all:interview` — Admin

### Query Parameters

-   `?interviewer=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?interviewee=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
-   `?after=2021-03-21T13:08:98Z`

## `POST /interviews`

Create an interview.

### Authorization

-   `create:interview` — Student, Admin

## `DELETE /interviews/{interview}`

Delete an interview i.e. cancel it.

### Authorization

-   `delete:interview` — Student, Interviewer, Admin
