import jwt from 'jsonwebtoken'

import { LogWarning } from '../utils/logger'
import { ErrorHandler } from '../error/errors'
import { type NextFunction, type Request, type Response } from 'express'
import { HTTP_STATUS_CODE } from '../consts'
import userService from '../domain/services/user_service'
import { secret } from '../config/app_config'

class JwtAuthFilter {
  async doFilterInternal(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader == null || !authHeader.startsWith('Bearer ')) {
      throw new ErrorHandler(
        'Token not provided',
        HTTP_STATUS_CODE.UNAUTHORIZED
      )
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, secret)
    const username = decoded.sub as string

    if (username === undefined) {
      LogWarning('JWT provided not includes a username')
      throw new ErrorHandler(
        'JWT provided not includes a username',
        HTTP_STATUS_CODE.FORBIDDEN
      )
    }

    // const existsUser = await userService.checkIfExistsByUsername(username)

    // if (!existsUser) {
    //   LogWarning('JWT provided was altered')
    //   throw new ErrorHandler(
    //     'User not exists in DB',
    //     HTTP_STATUS_CODE.FORBIDDEN
    //   )
    // }

    next()
  }
}

export default Object.freeze(new JwtAuthFilter())
