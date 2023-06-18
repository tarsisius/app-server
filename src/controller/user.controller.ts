import type { Request, Response } from 'express'
import argon2 from 'argon2'

import {
  registerUserBody,
  loginUserBody,
  updateUserNameBody,
  updateUserPasswordBody,
} from '../schema/user.schema'
import {
  insertUser,
  getUserByEmail,
  getUserById,
  updateUserName,
  updateUserPassword,
  updateUserRefreshToken,
  deleteUserById,
  getUserByRefreshToken,
} from '../service/user.service'
import { getJwtToken, verifyJwtRefreshToken } from '../util/token'
import { deleteTokenInCookie, setTokenToCookie } from '../util/cookie'

export async function registerUserHandler(req: Request, res: Response) {
  const body = await req.body
  const parse = registerUserBody.safeParse(body)

  if (!parse.success) {
    res.status(400).send({ message: 'Invalid body' })
    return
  }

  const { name, email, password } = parse.data

  const checkEmail = await getUserByEmail(email)

  if (checkEmail) {
    res.status(409).send({ message: 'Email already registered' })
    return
  }

  const hashedPassword = await argon2.hash(password)
  const user = await insertUser({ name, email, password: hashedPassword })

  if (!user) {
    res.status(500).send({ message: 'Error when create user' })
    return
  }

  const { accessToken, refreshToken } = await getJwtToken({ id: user.id })

  const update = await updateUserRefreshToken(refreshToken, user.id)

  if (!update) {
    await deleteUserById(user.id)

    res.status(500).send({ message: 'Error when create user' })
    return
  }

  setTokenToCookie(res, refreshToken)

  res.send({ accessToken })
  return
}

export async function loginUserHandler(req: Request, res: Response) {
  const body = await req.body
  const parse = loginUserBody.safeParse(body)

  if (!parse.success) {
    res.status(400).send({ message: 'Invalid body' })
    return
  }

  const { email, password } = parse.data

  const user = await getUserByEmail(email)

  if (!user) {
    res.status(401).send({ message: 'Invalid email/password' })
    return
  }

  const validPassword = await argon2.verify(user.password, password)

  if (!validPassword) {
    res.status(401).send({ message: 'Invalid email/password' })
    return
  }

  const { accessToken, refreshToken } = await getJwtToken({ id: user.id })

  const update = await updateUserRefreshToken(refreshToken, user.id)

  if (!update) {
    res.status(500).send({ message: 'Error when login user' })
    return
  }

  setTokenToCookie(res, refreshToken)

  res.send({ accessToken })
  return
}

export async function refreshTokenUserHandler(req: Request, res: Response) {
  const refreshToken = req.cookies?.refresh_token

  if (!refreshToken) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  const user = await getUserByRefreshToken(refreshToken)

  if (!user) {
    res.status(403).send({ message: 'Invalid refreshToken' })
    return
  }

  const verify = await verifyJwtRefreshToken(refreshToken)

  if (!verify) {
    res.status(403).send({ message: 'Invalid refreshToken' })
    return
  }

  const { accessToken } = await getJwtToken({ id: user.id })

  res.send({ accessToken })
  return
}

export async function logoutUserHandler(req: Request, res: Response) {
  const refreshToken = req.cookies?.refresh_token

  if (!refreshToken) {
    res.send({ message: 'Logout success' })
    return
  }

  const user = await getUserByRefreshToken(refreshToken)

  if (!user) {
    deleteTokenInCookie(res)

    res.send({ message: 'Logout success' })
    return
  }

  const update = await updateUserRefreshToken(null, user.id)

  if (!update) {
    res.status(500).send({ message: 'Error when logout user' })
    return
  }

  deleteTokenInCookie(res)

  res.send({ message: 'Logout success' })
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
    res.status(400).send({ message: 'Invalid body' })
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
    res.status(400).send({ message: 'Invalid body' })
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
