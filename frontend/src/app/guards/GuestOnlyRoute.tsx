import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthToken } from '@/shared/lib/auth-token'

interface GuestOnlyRouteProps {
  children: ReactNode
}

export function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
  const isAuthenticated = Boolean(getAuthToken())

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
