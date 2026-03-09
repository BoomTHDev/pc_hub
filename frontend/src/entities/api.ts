export type UserPosition = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'
export type CategoryStatus = 'ACTIVE' | 'INACTIVE'
export type ProductStatus = 'ACTIVE' | 'INACTIVE'

export interface CategorySummary {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
  description: string | null
  status: CategoryStatus
  products: CategorySummary[]
}

export interface Product {
  id: number
  name: string
  description: string
  category: CategorySummary
}

export interface SignInPayload {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
}

export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export interface RegisteredUser {
  id: number
  email: string
  phone: string
  position: UserPosition
}

export interface CategoryMutationPayload {
  name?: string
  description?: string
}

export interface ProductMutationPayload {
  name?: string
  description?: string
  price?: number
  stockQuantity?: number
  status?: ProductStatus
  categoryId?: number
}

export interface MutationMessage {
  message: string
}
