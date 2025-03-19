import { Response } from 'express'

export const sendSuccess = <T>(res: Response, data: T, code: number = 200) => {
  return res.status(code).json({
    status: 'success',
    data,
  })
}
