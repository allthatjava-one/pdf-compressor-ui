import { onRequestPost } from './functions/r2-presign.js'

async function getRuntimeConfig(env) {
  return {}
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/r2-presign' && request.method === 'POST') {
      return onRequestPost({ request, env })
    }

    if (url.pathname === '/runtime-config' && request.method === 'GET') {
      return Response.json(getRuntimeConfig(env), {
        headers: { 'Cache-Control': 'no-store' },
      })
    }

    if (url.pathname === '/') {
      return new Response('Local function worker is running. Open http://localhost:4173 for the app.', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    return new Response('Not found', { status: 404 })
  },
}