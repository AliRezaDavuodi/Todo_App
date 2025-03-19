import { plainToClass, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { sendError } from './sendError'

export const validateDto = <T extends object>(dtoClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoDataInstance = plainToInstance(dtoClass, req.body, { excludeExtraneousValues: true })
    const errors = await validate(dtoDataInstance)
    if (errors.length > 0) {
      sendError(res, errors, 400)
      return
    }

    const dtoKeys = Object.keys(dtoDataInstance)
    const bodyKeys = Object.keys(req.body)
    const extraKeys = bodyKeys.filter((key) => !dtoKeys.includes(key))

    if (extraKeys.length > 0) {
      sendError(res, `Extra properties are not allowed: ${extraKeys.join(', ')}`, 400)
      return
    }

    req.body = dtoDataInstance
    next()
  }
}
