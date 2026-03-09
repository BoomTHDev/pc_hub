import type { Product } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

export function listProducts() {
  return httpClient<Product[]>('/products', { useAuthToken: false })
}
