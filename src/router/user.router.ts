import { Router } from 'express'

import privateRoute from '../middleware/user.middleware'
import {
  loginUserHandler,
  logoutUserHandler,
  profileUserHandler,
  refreshTokenUserHandler,
  registerUserHandler,
  updateUserNameHandler,
  updateUserPasswordHandler,
} from '../controller/user.controller'

const userRouter = Router()

// @access Public
// @desc Register new user & set refreshToken and accessToken
// route POST /api/user/register
userRouter.post('/api/user/register', registerUserHandler)

// @access Public
// @desc Login user/set refreshToken and accessToken
// route POST /api/user/login
userRouter.post('/api/user/login', loginUserHandler)

// @access Public
// @desc Logout user/delete token
// route GET /api/user/logout
userRouter.get('/api/user/logout', logoutUserHandler)

// @access Public
// @desc Refresh accessToken
// route GET /api/user/refresh
userRouter.get('/api/user/refresh', refreshTokenUserHandler)

// @access Private
// @desc Get user profile
// route GET /api/user/profile
userRouter.get('/api/user/profile', privateRoute, profileUserHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/name
userRouter.patch('/api/user/update/name', privateRoute, updateUserNameHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/password
userRouter.patch(
  '/api/user/update/password',
  privateRoute,
  updateUserPasswordHandler
)

export default userRouter
