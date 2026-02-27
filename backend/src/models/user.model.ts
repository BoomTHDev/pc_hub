import { prisma } from '../../lib/prisma'
import type { CreateUserInput } from '../types/user'

export const UserModel = {
  create(data: CreateUserInput) {
    return prisma.user.create({ data })
  },

  getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  getById(id: number) {
    return prisma.user.findFirst({
      where: { id },
    })
  },

  getByPhone(phone: string) {
    return prisma.user.findUnique({
      where: { phone },
    })
  },
}
