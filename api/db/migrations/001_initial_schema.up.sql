-- TODO varchar lengths
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR (300) UNIQUE NOT NULL,
  ccid VARCHAR (300) NOT NULL,
  year INTEGER,
  degree VARCHAR (300) NOT NULL,
  -- Username / actual name from Oauth
  -- Access token / session
  -- Additional contact information
  -- Roles?
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- TODO cascade or restrict?
  user_id UUID REFERENCES users ON DELETE RESTRICT,
  url TEXT,
  -- Reviewing state? Enum? Created, reviewing, archived?
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- TODO cascade or restrict?
  user_id UUID REFERENCES users ON DELETE RESTRICT,
  resume_id UUID REFERENCES resumes ON DELETE CASCADE,
  url TEXT,
  -- Reviewing state? Enum?
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE
OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $ func $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ func $ LANGUAGE 'plpgsql';

CREATE TRIGGER update_time_users BEFORE
UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_time_resumes BEFORE
UPDATE
  ON resumes FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_time_reviews BEFORE
UPDATE
  ON reviews FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Table for each resume reviewer, interviewer
-- Table for feedback?