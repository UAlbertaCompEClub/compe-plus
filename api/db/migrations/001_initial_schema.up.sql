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
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
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

/* roles table */
CREATE TABLE roles (
    name text NOT NULL PRIMARY KEY
);

INSERT INTO
    roles (name)
VALUES
    ('reviewer'),
    ('interviewer'),
    ('admin');

/* user_roles table */
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    role TEXT NOT NULL REFERENCES roles ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, role)
);

/* resume_review_states table */
CREATE TABLE resume_review_states (
    name TEXT NOT NULL PRIMARY KEY
);

INSERT INTO
    resume_review_states (name)
VALUES
    ('creating'),
    ('seeking_reviewer'),
    ('reviewing'),
    ('finished'),
    ('cancelled');

/* resume_reviews table */
CREATE TABLE resume_reviews (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewee_id UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    reviewer_id UUID REFERENCES users ON DELETE RESTRICT,
    state TEXT NOT NULL REFERENCES resume_review_states ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_resume_reviews
    BEFORE UPDATE
    ON resume_reviews
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* document_states table */
CREATE TABLE document_states (
    name TEXT NOT NULL PRIMARY KEY
);

INSERT INTO
    document_states (name)
VALUES
    ('creating'),
    ('ready');

/* documents table */
CREATE TABLE documents (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    note TEXT NOT NULL,
    file_url TEXT NOT NULL,
    is_review BOOLEAN NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    state TEXT NOT NULL REFERENCES document_states ON DELETE RESTRICT,
    resume_review_id UUID NOT NULL REFERENCES resume_reviews ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_documents
    BEFORE UPDATE
    ON documents
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* time_slots table */
CREATE TABLE time_slots (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    at TIMESTAMPTZ NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_time_slots
    BEFORE UPDATE
    ON time_slots
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

/* interviews table */
CREATE TABLE interviews (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    time_slot UUID NOT NULL REFERENCES time_slots ON DELETE RESTRICT,
    interviewee UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    interviewer UUID NOT NULL REFERENCES users ON DELETE RESTRICT
);

CREATE TRIGGER update_time_interviews
    BEFORE UPDATE
    ON interviews
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
