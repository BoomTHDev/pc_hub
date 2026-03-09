import type { MutationMessage } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function softDeleteCategory(id: number) {
  return httpClient<MutationMessage>(`/categories/remove/${id}`, {
    method: 'DELETE',
  })
}
