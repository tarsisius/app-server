import type { Request, Response, NextFunction } from 'express'
import { verifyJwtToken } from '../util/token'

export default async function privateRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token

  if (token) {
    const decoded = await verifyJwtToken(token)

    if (!decoded) {
      res.status(401).send({ message: 'Not authorized: invalid token' })
      return
    }

    res.locals.user_id = decoded.id
    return next()
  } else {
    res.status(401).send({ message: 'Not authorized: no token' })
    return
  }
}
