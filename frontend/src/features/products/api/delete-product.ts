import type { MutationMessage } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function deleteProduct(id: number) {
  return httpClient<MutationMessage>(`/products/remove/${id}`, {
    method: 'DELETE',
  })
}
