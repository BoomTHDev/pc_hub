import type { Category, CategoryMutationPayload } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function createCategory(payload: Required<Pick<CategoryMutationPayload, 'name'>> & CategoryMutationPayload) {
  return httpClient<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
