import { ErrorHandler, responseError } from './errors'
import { LogError, LogWarning } from '../utils/logger'
import { type NextFunction, type Request, type Response } from 'express'
import { ErrorResponse } from '../type'
import { HTTP_STATUS_CODE } from '../consts'

export const errorHandlerApp = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response<ErrorResponse> => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  LogError(`${err.stack}`)

  // --> search with an id invalid for mongo
  if (err.name === 'CastError') {
    const message = `${err.message}`
    LogWarning(`${err.name}: ${err.message}`)

    err = new ErrorHandler(message, HTTP_STATUS_CODE.BAD_REQUEST)
  }

  if (err.name === 'ValidationError') {
    const message = `${err}`
    LogWarning(`${err.name}: ${err.message}`)

    err = new ErrorHandler(message, HTTP_STATUS_CODE.BAD_REQUEST)
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, HTTP_STATUS_CODE.BAD_REQUEST)
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid'
    err = new ErrorHandler(message, HTTP_STATUS_CODE.FORBIDDEN)
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is expired'
    err = new ErrorHandler(message, HTTP_STATUS_CODE.UNAUTHORIZED)
  }

  return responseError(err.statusCode, err.message, res)
}
