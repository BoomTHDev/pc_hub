import { useCallback } from 'react'
import { listProducts } from '@/features/products/api/list-products'
import { useAsyncData } from '@/shared/hooks/useAsyncData'

export function useProducts() {
  const loader = useCallback(() => listProducts(), [])
  return useAsyncData(loader)
}
