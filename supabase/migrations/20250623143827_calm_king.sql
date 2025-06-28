/*
  # Setup Initial Admin User

  1. Purpose
    - Create a function to make the first user an admin automatically
    - This allows the first person to sign up to become an admin
    - After that, admins can assign roles to other users

  2. Security
    - Only works if no admin exists yet
    - Automatically assigns admin role to first user
    - Safe fallback for initial setup
*/

-- Function to automatically make first user an admin
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Check if this is the first user (no admins exist yet)
  IF NOT EXISTS (SELECT 1 FROM user_roles WHERE role = 'admin') THEN
    -- Make the first user an admin
    INSERT INTO user_roles (user_id, role, created_by)
    VALUES (NEW.id, 'admin', NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run when new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;