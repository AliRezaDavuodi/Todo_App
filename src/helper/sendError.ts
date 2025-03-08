import { Response } from 'express';

export const sendError = (res: Response, message: string, code: number = 500) => {
    return res.status(code).json({
        message,
        status: 'error',
        code
    })
}