/*
  # Add status column to posts table

  1. Changes
    - Add `status` column to `posts` table with default value 'draft'
    - Add check constraint to ensure status values are valid
    - Update existing posts to have 'published' status if they were previously published
    - Add index on status column for better query performance

  2. Security
    - No changes to RLS policies needed as they already reference the status column
*/

-- Add status column with default value
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'status'
  ) THEN
    ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'draft';
  END IF;
END $$;

-- Add check constraint for valid status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'posts_status_check'
  ) THEN
    ALTER TABLE posts ADD CONSTRAINT posts_status_check 
    CHECK (status = ANY (ARRAY['draft'::text, 'pending'::text, 'published'::text, 'rejected'::text]));
  END IF;
END $$;

-- Update existing published posts to have 'published' status
UPDATE posts 
SET status = 'published' 
WHERE published = true AND status IS NULL;

-- Update remaining posts to have 'draft' status
UPDATE posts 
SET status = 'draft' 
WHERE status IS NULL;

-- Make status column NOT NULL after setting default values
ALTER TABLE posts ALTER COLUMN status SET NOT NULL;

-- Add index on status column for better query performance
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts USING btree (status);