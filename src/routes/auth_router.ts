import { Router } from 'express'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import { errorHandlerApp } from '../error/errorHandlerApp'
import AuthController from '../controllers/auth_controller'
import { IUserService } from '../domain/services/interfaces'

export default class AuthRouter {
  static #instance: AuthRouter
  public routes: Router
  private authController: AuthController

  private constructor(userService: IUserService) {
    this.routes = Router()
    this.authController = AuthController.getInstance(userService)
    this.initRoutes()
  }

  public static getInstance(userService: IUserService): AuthRouter {
    if (!AuthRouter.#instance) {
      this.#instance = new AuthRouter(userService)
    }

    return this.#instance
  }

  private initRoutes() {
    this.routes
      .route('/register')
      .post(catchAsyncErrors(this.authController.registerUser))

    this.routes
      .route('/login')
      .post(catchAsyncErrors(this.authController.loginUser))

    this.routes.use(errorHandlerApp)
  }
}
