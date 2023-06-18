import { SignJWT, jwtVerify } from 'jose'
import config from './config'

export async function getJwtToken({ id }: { id: string }) {
  const accessToken = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(config.TOKEN_ACCESS_SECRET))

  const refreshToken = await new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(config.TOKEN_REFRESH_SECRET))

  return { accessToken, refreshToken }
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

