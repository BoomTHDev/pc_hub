import type { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

export const AuthController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const newUser = await AuthService.register(body)
      res.json(newUser)
    } catch (error) {
      next(error)
    }
  },

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      const token = await AuthService.login(body)
      res.json({ token })
    } catch (error) {
      next(error)
    }
  },
}
