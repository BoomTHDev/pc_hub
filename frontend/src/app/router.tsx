import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/app/layouts/AppLayout'
import { GuestOnlyRoute } from '@/app/guards/GuestOnlyRoute'
import { HomePage } from '@/pages/home/HomePage'
import { ProductsPage } from '@/pages/products/ProductsPage'
import { CategoriesPage } from '@/pages/categories/CategoriesPage'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'auth', element: <Navigate to="/signin" replace /> },
      {
        path: 'signin',
        element: (
          <GuestOnlyRoute>
            <SignInPage />
          </GuestOnlyRoute>
        ),
      },
      {
        path: 'signup',
        element: (
          <GuestOnlyRoute>
            <SignUpPage />
          </GuestOnlyRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
