import type { MutationMessage, ProductMutationPayload } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function updateProduct(id: number, payload: ProductMutationPayload) {
  return httpClient<MutationMessage>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
