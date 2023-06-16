import { Router } from 'express'

import privateRoute from '../middleware/user.middleware'
import {
  loginUserHandler,
  logoutUserHandler,
  profileUserHandler,
  registerUserHandler,
  updateUserNameHandler,
  updateUserPasswordHandler,
} from '../controller/user.controller'

const userRouter = Router()

// @access Public
// @desc Register new user
// route POST /api/user/register
userRouter.post('/api/user/register', registerUserHandler)

// @access Public
// @desc Login user/set token
// route POST /api/user/login
userRouter.post('/api/user/login', loginUserHandler)

// @access Public
// @desc Logout user/delete token
// route POST /api/user/logout
userRouter.post('/api/user/logout', logoutUserHandler)

// @access Private
// @desc Get user profile
// route GET /api/user/profile
userRouter.get('/api/user/profile', privateRoute, profileUserHandler)

// @access Private
// @desc Update user name profile
// route PUT /api/user/name
userRouter.put('/api/user/update/name', privateRoute, updateUserNameHandler)

// @access Private
// @desc Update user name profile
// route PUT /api/user/password
userRouter.put(
  '/api/user/update/password',
  privateRoute,
  updateUserPasswordHandler
)

export default userRouter
