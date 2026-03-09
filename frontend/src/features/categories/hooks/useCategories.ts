import { useCallback } from 'react'
import { listCategories } from '@/features/categories/api/list-categories'
import { useAsyncData } from '@/shared/hooks/useAsyncData'

export function useCategories() {
  const loader = useCallback(() => listCategories(), [])
  return useAsyncData(loader)
}
