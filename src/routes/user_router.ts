import { Router } from 'express'
import { errorHandlerApp } from '../error/errorHandlerApp'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import jwtAuthFilter from '../security/JwtAuthFilter'
import UserController from '../controllers/user_controller'
import { IUserRepository } from '../domain/repositories/interfaces'

export default class UserRouter {
  public routes: Router
  static #instance: UserRouter
  private userController: UserController

  public constructor(userRepository: IUserRepository) {
    this.routes = Router()
    this.userController = UserController.getInstance(userRepository)
    this.initRoutes()
  }

  public static getInstance(userRepository: IUserRepository): UserRouter {
    if (!UserRouter.#instance) {
      UserRouter.#instance = new UserRouter(userRepository)
    }

    return UserRouter.#instance
  }

  private initRoutes() {
    this.routes
      .route('/all')
      .get(
        catchAsyncErrors(jwtAuthFilter.doFilterInternal),
        catchAsyncErrors(this.userController.getAll)
      ) // ✅

    this.routes
      .route('/all-notes')
      .get(
        catchAsyncErrors(jwtAuthFilter.doFilterInternal),
        catchAsyncErrors(this.userController.getNotesFromUser)
      ) // ✅

    this.routes.use(errorHandlerApp)
  }
}
