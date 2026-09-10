/*
# Storage policies for avatars bucket

## Purpose
Allow authenticated users to upload, read, and manage their own avatar
images in the `avatars` storage bucket. Each user's avatars live under
a folder named after their auth uid.

## Security
- SELECT (read): public, so avatar URLs render for all visitors.
- INSERT/UPDATE/DELETE: only the owner (folder path = auth uid).
*/
DROP POLICY IF EXISTS "public_read_avatars" ON storage.objects;
CREATE POLICY "public_read_avatars"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "owner_insert_avatars" ON storage.objects;
CREATE POLICY "owner_insert_avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "owner_update_avatars" ON storage.objects;
CREATE POLICY "owner_update_avatars"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "owner_delete_avatars" ON storage.objects;
CREATE POLICY "owner_delete_avatars"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
