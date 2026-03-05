import { prisma } from '../../lib/prisma'
import type { CreateUserInput } from '../dto/user.dto'

export const UserModel = {
  create(data: CreateUserInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        phone: true,
        position: true,
      },
    })
  },

  getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        phone: true,
        position: true,
        password: true,
      },
    })
  },

  getById(id: number) {
    return prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        position: true,
      },
    })
  },

  getByPhone(phone: string) {
    return prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        email: true,
        phone: true,
        position: true,
      },
    })
  },
}
