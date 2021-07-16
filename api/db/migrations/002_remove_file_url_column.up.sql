/* Drop the file_url column as it is no longer needed. Document id serves as key into S3 storage. */
ALTER TABLE documents DROP COLUMN file_url;