import type { MutationMessage } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function restoreCategory(id: number) {
  return httpClient<MutationMessage>(`/categories/restore/${id}`, {
    method: 'PUT',
  })
}
