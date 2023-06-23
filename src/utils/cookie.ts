import type { Response } from 'express'
import config from './config'

export function setRefreshTokenToCookie(res: Response, refreshToken: string) {
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== 'developement',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d,
  })

  return
}

export function deleteRefreshTokenInCookie(res: Response) {
  res.cookie('refresh_token', '', {
    httpOnly: true,
    secure: config.NODE_ENV !== 'developement',
    sameSite: 'strict',
    expires: new Date(0),
  })

  return
}
