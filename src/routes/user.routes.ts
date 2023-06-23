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

userRoutes.use('/api', userRoutes)

// @access Public
// @desc Register new user & set refreshToken and accessToken
// route POST /api/user/register
userRoutes.post('/user/register', registerUserHandler)

// @access Public
// @desc Login user/set refreshToken and accessToken
// route POST /api/user/login
userRoutes.post('/user/login', loginUserHandler)

// @access Public
// @desc Logout user/delete token
// route POST /api/user/logout
userRoutes.post('/user/logout', logoutUserHandler)

// @access Public
// @desc Refresh accessToken
// route GET /api/user/refresh
userRoutes.get('/user/refresh', refreshTokenUserHandler)

// @access Private
// @desc Get user profile
// route GET /api/user/profile
userRoutes.get('/user/profile', verifyUser, profileUserHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/name
userRoutes.patch('/user/update/name', verifyUser, updateUserNameHandler)

// @access Private
// @desc Update user name profile
// route PATCH /api/user/password
userRoutes.patch('/user/update/password', verifyUser, updateUserPasswordHandler)

export default userRoutes
