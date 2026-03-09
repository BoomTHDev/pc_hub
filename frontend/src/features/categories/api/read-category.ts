import type { Category } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function readCategory(id: number) {
  return httpClient<Category>(`/categories/${id}`, { useAuthToken: false })
}
