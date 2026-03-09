import type { MutationMessage } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function hardDeleteCategory(id: number) {
  return httpClient<MutationMessage>(`/categories/${id}`, {
    method: 'DELETE',
  })
}
