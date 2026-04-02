import { supabase } from '@/lib/supabase';

const STORAGE_URL = 'https://yplehzgtdgyygywbmldy.supabase.co/storage/v1/object/public';

/**
 * Upload a file to Supabase Storage and return the public URL.
 * @param file - File object from input
 * @param bucket - Storage bucket name (e.g. 'public-uploads')
 * @param folder - Optional subfolder path
 * @returns Public URL of uploaded file
 */
export async function uploadFile(
  file: File,
  bucket: string = 'public-uploads',
  folder: string = ''
): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const fileName = folder
    ? `${folder}/${timestamp}-${random}.${ext}`
    : `${timestamp}-${random}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);
  return `${STORAGE_URL}/${bucket}/${fileName}`;
}
