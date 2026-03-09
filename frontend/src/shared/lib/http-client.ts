import { env } from '@/shared/config/env'
import { getAuthToken } from '@/shared/lib/auth-token'

interface RequestOptions extends RequestInit {
  token?: string
  useAuthToken?: boolean
}

export async function httpClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, useAuthToken = true, headers, body, ...restOptions } = options
  const finalToken = token ?? (useAuthToken ? getAuthToken() : null)

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...restOptions,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
      ...headers,
    },
    body,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const data = (await response.json()) as { error?: string }
      if (data.error) message = data.error
    } catch {
      // Use default fallback for non-json error responses.
    }

    throw new Error(message)
  }

  const hasNoContent = response.status === 204
  if (hasNoContent) {
    return undefined as T
  }

  return (await response.json()) as T
}
