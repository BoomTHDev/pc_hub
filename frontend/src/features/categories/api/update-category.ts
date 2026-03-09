import type { CategoryMutationPayload, MutationMessage } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function updateCategory(id: number, payload: CategoryMutationPayload) {
  return httpClient<MutationMessage>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
