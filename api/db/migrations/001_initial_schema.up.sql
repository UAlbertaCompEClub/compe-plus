/* Enable UUID support */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* Auto timestamping function */
CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS
$func$
BEGIN
    NEW.updated_at = now();
    return NEW;
END;
$func$ LANGUAGE 'plpgsql';

/* users table */
CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    ccid TEXT NOT NULL,
    program TEXT NOT NULL,
    year SMALLINT NOT NULL,
    given_name TEXT NOT NULL,
    family_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_users
    BEFORE UPDATE
    ON users
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* roles enum */
CREATE TYPE role_type AS ENUM ('student', 'reviewer', 'interviewer', 'admin');

/* user_roles table */
CREATE TABLE IF NOT EXISTS user_roles (
    user_id TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    role role_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, role)
);

/* resume_review_state enum*/
CREATE TYPE resume_review_state AS ENUM (
    'seeking_reviewer',
    'reviewing',
    'finished',
    'canceled'
);

/* resume_reviews table */
CREATE TABLE IF NOT EXISTS resume_reviews (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewee_id TEXT NOT NULL REFERENCES users ON DELETE RESTRICT,
    reviewer_id TEXT REFERENCES users ON DELETE RESTRICT,
    state resume_review_state NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_resume_reviews
    BEFORE UPDATE
    ON resume_reviews
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* documents table */
CREATE TABLE IF NOT EXISTS documents (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    note TEXT NOT NULL,
    file_url TEXT NOT NULL,
    is_review BOOLEAN NOT NULL,
    user_id TEXT NOT NULL REFERENCES users ON DELETE RESTRICT,
    resume_review_id UUID NOT NULL REFERENCES resume_reviews ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_documents
    BEFORE UPDATE
    ON documents
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* time_slots table */
CREATE TABLE IF NOT EXISTS time_slots (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_time_slots
    BEFORE UPDATE
    ON time_slots
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* interviews table */
CREATE TABLE IF NOT EXISTS interviews (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    time_slot UUID NOT NULL REFERENCES time_slots ON DELETE RESTRICT,
    interviewee TEXT NOT NULL REFERENCES users ON DELETE RESTRICT,
    interviewer TEXT NOT NULL REFERENCES users ON DELETE RESTRICT
);

CREATE TRIGGER update_time_interviews
    BEFORE UPDATE
    ON interviews
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
