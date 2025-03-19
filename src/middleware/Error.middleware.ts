import { Request, Response, NextFunction } from 'express'
import { sendError } from '../helper/sendError'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  sendError(res, 'Something went wrong', 500)
}
