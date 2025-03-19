import { Router, Request, Response } from 'express'
import { sendError } from '../helper/sendError'
import { validate } from 'class-validator'
import { RegisterDto } from '../dtos/auth/register.dto'
import { validateDto } from '../helper/validateDto'
import { AuthService } from '../service/auth.service'
import { UserService } from '../service/user.service'
import { sendSuccess } from '../helper/sendSuccess'

export const authController: Router = Router()
const authService = new AuthService()
const userService = new UserService()

authController.post('/register', validateDto(RegisterDto), async (req: Request<{}, {}, RegisterDto>, res: Response) => {
  try {
    const { username, password, name, email } = req.body

    const isUserExist = await userService.findByEmail(email)

    if (isUserExist) {
      sendError(res, 'User Is already exist!', 400)
      return
    }

    const user = await authService.register({ username, password, name, email })
    sendSuccess(res, user, 201)


  } catch (err) {
    console.log(err)
    sendError(res, 'something went wrong, please try later.', 500)
  }
})
