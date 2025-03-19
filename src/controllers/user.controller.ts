import { Router, Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { sendSuccess } from '../helper/sendSuccess'
import { sendError } from '../helper/sendError'

export const userController: Router = Router()

const userService = new UserService()

userController.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll()
    sendSuccess(res, users, 200)
  } catch (err) {
    console.log(err)
    sendError(res, 'something went wrong play try later', 500)
  }
})
