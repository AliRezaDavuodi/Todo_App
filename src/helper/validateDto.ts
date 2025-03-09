import { plainToClass, plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"
import { sendError } from "./sendError"


export const validateDto = <T extends object>(dtoClass: new () => T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoDataInstance = plainToInstance(dtoClass, req.body, { excludeExtraneousValues: true })
        const errors = await validate(dtoDataInstance)
        if (errors.length > 0) {
            sendError(res, errors, 400)
        }

        if (Object.keys(req.body).length > Object.keys(dtoDataInstance).length) {
            sendError(res, 'Please remove Extra properties from the body.', 400)
        }

        req.body = dtoDataInstance
        next()
    }
}



