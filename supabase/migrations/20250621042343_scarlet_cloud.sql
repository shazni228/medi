/*
  # Fix infinite recursion in user_roles RLS policies

  1. Problem
    - Current RLS policies on user_roles table cause infinite recursion
    - Policies are trying to check user roles by querying the same table they protect

  2. Solution
    - Drop existing problematic policies
    - Create new policies that avoid self-referential checks
    - Use direct user ID comparisons instead of role-based checks where possible
    - Create a security definer function for admin checks

  3. Changes
    - Drop all existing policies on user_roles table
    - Create new non-recursive policies
    - Add security definer function for safe admin role checking
*/

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can read their own roles" ON user_roles;

-- Create a security definer function to safely check if a user is admin
-- This function runs with elevated privileges and bypasses RLS
CREATE OR REPLACE FUNCTION is_user_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_user_admin(uuid) TO authenticated;

-- Create new non-recursive policies
CREATE POLICY "Users can read their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (is_user_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (is_user_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (is_user_admin(auth.uid()))
  WITH CHECK (is_user_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (is_user_admin(auth.uid()));