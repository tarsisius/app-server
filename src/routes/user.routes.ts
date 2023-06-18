import { Router } from 'express'

import { verifyUser } from '../middlewares/user.middlewares'
import {
  loginUserHandler,
  logoutUserHandler,
  profileUserHandler,
  refreshTokenUserHandler,
  registerUserHandler,
  updateUserNameHandler,
  updateUserPasswordHandler,
} from '../controllers/user.controllers'

const userRoutes = Router()

// @access Public
// @desc Register new user & set refreshToken and accessToken
// route POST /api/user/register
userRoutes.post('/api/user/register', registerUserHandler)

// @access Public
// @desc Login user/set refreshToken and accessToken
// route POST /api/user/login
userRoutes.post('/api/user/login', loginUserHandler)

// @access Public
// @desc Logout user/delete token
// route GET /api/user/logout
userRoutes.get('/api/user/logout', logoutUserHandler)

// @access Public
// @desc Refresh accessToken
// route GET /api/user/refresh
userRoutes.get('/api/user/refresh', refreshTokenUserHandler)

// @access Private
// @desc Get user profile
// route GET /api/user/profile
userRoutes.get('/api/user/profile', verifyUser, profileUserHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/name
userRoutes.patch('/api/user/update/name', verifyUser, updateUserNameHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/password
userRoutes.patch(
  '/api/user/update/password',
  verifyUser,
  updateUserPasswordHandler
)

export default userRoutes
