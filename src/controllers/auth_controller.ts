import { NextFunction, Request, Response } from 'express'
import { UserCreation } from '../domain/sequelize/entities/User'
import { HTTP_STATUS_CODE } from '../consts'
import { IAuthService, IUserService } from '../domain/services/interfaces'
import AuthService from '../domain/services/auth_service'

export default class AuthController {
  static #instance: AuthController
  private authService: IAuthService

  private constructor(userService: IUserService) {
    this.authService = AuthService.getInstance(userService)
    // Si quiero utilizar funciones normales: --> porque las funciones tienen su propio contexto
    // this.registerUser = this.registerUser.bind(this)
    // this.loginUser = this.loginUser.bind(this)
  }

  public static getInstance(userService: IUserService): AuthController {
    if (!AuthController.#instance) {
      this.#instance = new AuthController(userService)
    }

    return this.#instance
  }

  registerUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const data: UserCreation = req.body
    const { username, password } = data

    const authResponse = await this.authService.registerUser({
      username,
      password
    })

    return res.status(HTTP_STATUS_CODE.CREATED).json(authResponse)
  }

  loginUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const data: UserCreation = req.body
    const { username, password } = data

    const authResponse = await this.authService.loginUser({
      username,
      password
    })
    return res.status(HTTP_STATUS_CODE.OK).json(authResponse)
  }
}
