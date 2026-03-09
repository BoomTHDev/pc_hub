import type { Product, ProductMutationPayload } from '@/entities/api'
import { httpClient } from '@/shared/lib/http-client'

type CreateProductPayload = Required<Pick<ProductMutationPayload, 'name' | 'description' | 'price' | 'categoryId'>> &
  ProductMutationPayload

export function createProduct(payload: CreateProductPayload) {
  return httpClient<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
