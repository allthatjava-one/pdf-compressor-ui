import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// DEV ONLY: direct browser upload. Switch to backend presigning before deploying.
const s3 = new S3Client({
  region: 'auto',
  endpoint: import.meta.env.VITE_R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY,
  },
})

const BUCKET = import.meta.env.VITE_R2_BUCKET_NAME

/**
 * Generates a presigned PUT URL and uploads the file directly to Cloudflare R2.
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<string>} The presigned URL used for the upload.
 */
export async function uploadToR2(file) {
  const key = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`

  const presignedUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: 'application/pdf' }),
    { expiresIn: 300 },
  )

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': 'application/pdf' },
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
  }

  return { presignedUrl, key }
}
