let runtimeConfigPromise

async function loadRuntimeConfig() {
  const response = await fetch('/runtime-config', {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to load runtime config: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function getRuntimeConfig() {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = loadRuntimeConfig().catch((error) => {
      runtimeConfigPromise = undefined
      throw error
    })
  }

  return runtimeConfigPromise
}