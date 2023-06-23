import type { Request, Response } from 'express'
import argon2 from 'argon2'

import {
  registerUserBody,
  loginUserBody,
  updateUserNameBody,
  updateUserPasswordBody,
} from '../types/user.types'
import {
  insertUser,
  getUserByEmail,
  getUserById,
  updateUserName,
  updateUserPassword,
} from '../queries/user.queries'
import {
  getJwtAccessToken,
  getJwtRefreshToken,
  verifyJwtRefreshToken,
} from '../utils/token'
import {
  deleteRefreshTokenInCookie,
  setRefreshTokenToCookie,
} from '../utils/cookie'

export async function registerUserHandler(req: Request, res: Response) {
  const body = await req.body
  const parse = registerUserBody.safeParse(body)

  if (!parse.success) {
    res.status(400).end()
    return
  }

  const { name, email, password } = parse.data

  const checkEmail = await getUserByEmail(email)

  if (checkEmail) {
    res.status(409).end()
    return
  }

  const hashedPassword = await argon2.hash(password)
  const user = await insertUser({ name, email, password: hashedPassword })

  if (!user) {
    res.status(500).end()
    return
  }

  const refreshToken = await getJwtRefreshToken({ id: user.id })

  setRefreshTokenToCookie(res, refreshToken)

  const accessToken = await getJwtAccessToken({ id: user.id })

  res.send({ accessToken })
  return
}

export async function loginUserHandler(req: Request, res: Response) {
  const body = await req.body
  const parse = loginUserBody.safeParse(body)

  if (!parse.success) {
    res.status(400).end()
    return
  }

  const { email, password } = parse.data

  const user = await getUserByEmail(email)

  if (!user) {
    res.status(401).end()
    return
  }

  const validPassword = await argon2.verify(user.password, password)

  if (!validPassword) {
    res.status(401).end()
    return
  }

  const refreshToken = await getJwtRefreshToken({ id: user.id })

  setRefreshTokenToCookie(res, refreshToken)

  const accessToken = await getJwtAccessToken({ id: user.id })

  res.send({ accessToken })
  return
}

export async function refreshTokenUserHandler(req: Request, res: Response) {
  const refreshToken = req.cookies?.refresh_token

  if (!refreshToken) {
    res.status(401).end()
    return
  }

  const verify = await verifyJwtRefreshToken(refreshToken)

  if (!verify) {
    deleteRefreshTokenInCookie(res)
    res.status(401).end()
    return
  }

  const user = await getUserById(verify.id)

  if (!user) {
    deleteRefreshTokenInCookie(res)
    res.status(401).end()
    return
  }

  const newRefreshToken = await getJwtRefreshToken({ id: verify.id })

  setRefreshTokenToCookie(res, newRefreshToken)

  const accessToken = await getJwtAccessToken({ id: verify.id })

  res.send({ accessToken })
  return
}

export async function logoutUserHandler(req: Request, res: Response) {
  const refreshToken = req.cookies?.refresh_token

  if (!refreshToken) {
    res.end()
    return
  }

  deleteRefreshTokenInCookie(res)

  res.end()
  return
}

export async function profileUserHandler(_: Request, res: Response) {
  const id = res.locals.user_id
  const user = await getUserById(id)

  res.send({ ...user })
  return
}

export async function updateUserNameHandler(req: Request, res: Response) {
  const id = res.locals.user_id

  const body = await req.body
  const parse = updateUserNameBody.safeParse(body)

  if (!parse.success) {
    res.status(400).end()
    return
  }

  const { name } = parse.data

  if (!name) {
    const user = await getUserById(id)

    res.send({ ...user })
    return
  }

  const updated = await updateUserName(name, id)

  res.send({ ...updated })
  return
}

export async function updateUserPasswordHandler(req: Request, res: Response) {
  const id = res.locals.user_id

  const body = await req.body
  const parse = updateUserPasswordBody.safeParse(body)

  if (!parse.success) {
    res.status(400).end()
    return
  }

  const { password } = parse.data

  if (!password) {
    const user = await getUserById(id)

    res.send({ ...user })
    return
  }

  const hashedPassword = await argon2.hash(password)

  const updated = await updateUserPassword(hashedPassword, id)

  res.send({ ...updated })
  return
}
