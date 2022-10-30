import { User, UserRegister } from '../../../api-client'
import { RouterHandler, UnprocessableEntityError } from '../types'
import * as crypto from 'crypto'

export const userRegister: RouterHandler = async (req, res, next) => {
  try {
    const body = req.body as UserRegister

    if (!body.name) {
      throw new UnprocessableEntityError('Missing name')
    }

    const user: User = {
      createdAt: new Date().toISOString(),
      email: body.email,
      id: crypto.randomBytes(16).toString("hex"),
      name: body.name,
      status: 'active'
    }

    res.json({
      user
    })
  } catch (err) {
    next(err)
  }
}
