import type { Request, Response, NextFunction } from 'express'
import { verifyJwtAccessToken } from '../util/token'

export default async function privateRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).send({ message: 'Not authorized: no accessToken' })
    return
  }

  const accessToken = authHeader.split(' ')[1]  // Bearer <accessToken>

  if (accessToken) {
    const decoded = await verifyJwtAccessToken(accessToken)

    if (!decoded) {
      res.status(401).send({ message: 'Not authorized: invalid accessToken' })
      return
    }

    res.locals.user_id = decoded.id
    return next()
  } else {
    res.status(401).send({ message: 'Not authorized: no accessToken' })
    return
  }
}
