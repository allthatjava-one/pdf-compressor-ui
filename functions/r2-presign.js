import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function onRequestPost(context) {
  // Read R2 credentials and runtime config from environment variables (never exposed to the browser)
  const { R2_ENDPOINT_URL, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PDF_COMPRESSOR_BUCKET_NAME, PDF_COMPRESSOR_BACKEND_URL } = context.env

  const { filename, contentType } = await context.request.json()

  const key = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`

  const s3 = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT_URL,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  })

  const presignedUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: R2_PDF_COMPRESSOR_BUCKET_NAME, Key: key, ContentType: contentType }),
    { expiresIn: 300 },
  )

  // Expose the backend URL so the frontend can call the compression API directly if needed
  const pdfCompressorBackendUrl = PDF_COMPRESSOR_BACKEND_URL || ''

  return new Response(
    JSON.stringify({ presignedUrl, key, pdfCompressorBackendUrl }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
