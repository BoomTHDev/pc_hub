import type { RegisteredUser, SignUpPayload } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function signUp(payload: SignUpPayload) {
  return httpClient<RegisteredUser>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
    useAuthToken: false,
  })
}
