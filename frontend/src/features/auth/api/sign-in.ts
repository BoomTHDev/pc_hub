import type { SignInPayload, SignInResponse } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function signIn(payload: SignInPayload) {
  return httpClient<SignInResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
    useAuthToken: false,
  })
}
