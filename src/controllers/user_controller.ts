import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS_CODE } from '../consts'
import { IdType } from '../type'
import { IUserRepository } from '../domain/repositories/interfaces'
import { IUserService } from '../domain/services/interfaces'
import UserService from '../domain/services/user_service'

export default class UserController {
  static #instance: UserController
  private userService: IUserService

  private constructor(userRepository: IUserRepository) {
    this.userService = UserService.getInstance(userRepository)
  }

  public static getInstance(userRepository: IUserRepository): UserController {
    if (!UserController.#instance) {
      UserController.#instance = new UserController(userRepository)
    }

    return UserController.#instance
  }

  getAll = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const user = await this.userService.findAll()
    return res.status(HTTP_STATUS_CODE.OK).json(user)
  }

  getNotesFromUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const userId = req.query.userId as IdType

    const notesFromUser = await this.userService.findNotesFromUser(userId)
    return res.status(HTTP_STATUS_CODE.OK).json(notesFromUser)
  }
}
