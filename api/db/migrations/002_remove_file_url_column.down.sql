/* Re-add the file_url column. Default empty string so that NOT NULL constraint can be re-added. */
ALTER TABLE documents ADD COLUMN file_url TEXT NOT NULL DEFAULT '';