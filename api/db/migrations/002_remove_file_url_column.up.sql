/* Drop the file_url column as it is no longer needed. Document id serves as key into blob storage. */
ALTER TABLE documents DROP COLUMN file_url;