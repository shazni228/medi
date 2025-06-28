/*
  # Assign Admin Role to Specific User

  1. Purpose
    - Make shazniahamed228@gmail.com an admin user
    - Grant full write and publish permissions
    - Ensure the user can manage content and other users

  2. Changes
    - Find user by email and assign admin role
    - Handle case where user doesn't exist yet
    - Create function to assign role by email
*/

-- Create function to assign admin role by email
CREATE OR REPLACE FUNCTION assign_admin_by_email(user_email text)
RETURNS void AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;

  -- If user exists, assign admin role
  IF target_user_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role, created_by)
    VALUES (target_user_id, 'admin', target_user_id)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role assigned to user: %', user_email;
  ELSE
    RAISE NOTICE 'User not found: %', user_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Assign admin role to the specific user
SELECT assign_admin_by_email('shazniahamed228@gmail.com');

-- Create a trigger function to auto-assign admin role when this specific user signs up
CREATE OR REPLACE FUNCTION handle_specific_admin_user()
RETURNS trigger AS $$
BEGIN
  -- Check if this is the specific user we want to make admin
  IF NEW.email = 'shazniahamed228@gmail.com' THEN
    INSERT INTO user_roles (user_id, role, created_by)
    VALUES (NEW.id, 'admin', NEW.id)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for future signups of this specific user
DROP TRIGGER IF EXISTS on_specific_admin_user_created ON auth.users;
CREATE TRIGGER on_specific_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  WHEN (NEW.email = 'shazniahamed228@gmail.com')
  EXECUTE FUNCTION handle_specific_admin_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION assign_admin_by_email(text) TO authenticated;