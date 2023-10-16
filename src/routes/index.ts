import express from 'express'
import UserRouter from './user_router'
import AuthRouter from './auth_router'
import NoteRouter from './note_router'
import NoteService from '../domain/services/note_service'
import UserRepository from '../domain/repositories/user_repository'
import UserService from '../domain/services/user_service'
import NoteRepository from '../domain/repositories/note_repository'

/**
 * All routes of the proyect.
 */
const rootRouter = express()

const userService = UserService.getInstance(UserRepository.getInstance())

const userRouter = UserRouter.getInstance(UserRepository.getInstance())
const authRouter = AuthRouter.getInstance(userService)
const noteRouter = NoteRouter.getInstance(
  NoteRepository.getInstance(),
  userService
)

rootRouter.use('/auth', authRouter.routes)
rootRouter.use('/users', userRouter.routes)
rootRouter.use('/notes', noteRouter.routes)

export default rootRouter
