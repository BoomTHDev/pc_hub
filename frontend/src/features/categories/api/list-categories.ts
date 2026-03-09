import type { Category } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function listCategories() {
  return httpClient<Category[]>('/categories', { useAuthToken: false })
}
