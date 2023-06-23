import { SignJWT, jwtVerify } from 'jose'
import config from './config'

export async function getJwtAccessToken({ id }: { id: string }) {
  const accessToken = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.TOKEN_ACCESS_EXPIRES_IN)
    .sign(new TextEncoder().encode(config.TOKEN_ACCESS_SECRET))

  return accessToken
}

export async function getJwtRefreshToken({ id }: { id: string }) {
  const refreshToken = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.TOKEN_REFRESH_EXPIRES_IN)
    .sign(new TextEncoder().encode(config.TOKEN_REFRESH_SECRET))

  return refreshToken
}

export async function verifyJwtAccessToken(token: string | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.TOKEN_ACCESS_SECRET)
    )
    return payload as {
      id: string
    }
  } catch (_err) {
    return null
  }
}

export async function verifyJwtRefreshToken(token: string | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.TOKEN_REFRESH_SECRET)
    )
    return payload as {
      id: string
    }
  } catch (_err) {
    return null
  }
}
