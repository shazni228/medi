/*
  # Add User Roles and Publishing Workflow

  1. New Tables
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (text, enum: 'admin', 'writer', 'publisher')
      - `created_at` (timestamp)
      - `created_by` (uuid, references auth.users)
    
    - Update `posts` table
      - Add `status` column (draft, pending, published, rejected)
      - Add `published_by` column (uuid, references auth.users)
      - Add `published_at` column (timestamp)

  2. Security
    - Update RLS policies for role-based access
    - Writers can create and edit their own drafts
    - Publishers can approve and publish posts
    - Admins have full access

  3. Workflow
    - Writers create posts in 'draft' status
    - Writers can submit for review (status: 'pending')
    - Publishers can approve (status: 'published') or reject posts
    - Only published posts show on frontend
*/

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'writer', 'publisher')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Add new columns to posts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'status'
  ) THEN
    ALTER TABLE posts ADD COLUMN status text DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'published', 'rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'published_by'
  ) THEN
    ALTER TABLE posts ADD COLUMN published_by uuid REFERENCES auth.users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'published_at'
  ) THEN
    ALTER TABLE posts ADD COLUMN published_at timestamptz;
  END IF;
END $$;

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authors can read their own posts" ON posts;
DROP POLICY IF EXISTS "Authors can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON posts;
DROP POLICY IF EXISTS "Authors can delete their own posts" ON posts;

-- New posts policies with role-based access
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Writers can read their own posts"
  ON posts
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = author_id OR 
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'publisher')
    )
  );

CREATE POLICY "Writers can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'writer', 'publisher')
    )
  );

CREATE POLICY "Writers can update their own drafts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (
    (auth.uid() = author_id AND status IN ('draft', 'rejected')) OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'publisher')
    )
  )
  WITH CHECK (
    (auth.uid() = author_id AND status IN ('draft', 'pending', 'rejected')) OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'publisher')
    )
  );

CREATE POLICY "Writers can delete their own drafts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (
    (auth.uid() = author_id AND status = 'draft') OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- User roles policies
CREATE POLICY "Users can read their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS user_roles_user_id_idx ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS user_roles_role_idx ON user_roles(role);

-- Create function to check user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid uuid)
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM user_roles 
    WHERE user_id = user_uuid 
    ORDER BY 
      CASE role 
        WHEN 'admin' THEN 1 
        WHEN 'publisher' THEN 2 
        WHEN 'writer' THEN 3 
      END 
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to assign user role (only admins can use this)
CREATE OR REPLACE FUNCTION assign_user_role(target_user_id uuid, new_role text)
RETURNS void AS $$
BEGIN
  -- Check if current user is admin
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can assign roles';
  END IF;

  -- Insert or update role
  INSERT INTO user_roles (user_id, role, created_by)
  VALUES (target_user_id, new_role, auth.uid())
  ON CONFLICT (user_id, role) 
  DO UPDATE SET created_by = auth.uid(), created_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;