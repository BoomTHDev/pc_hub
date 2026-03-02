import type { UserPosition } from "../../generated/prisma/enums";

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  position: UserPosition;
}
