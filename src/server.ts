import app from './app'
import { todoController } from './controllers/todo.controller'
import { AppDataSource } from './database/database'
import { userController } from './controllers/user.controller'
import { authController } from './controllers/auth.controller'

const PORT: string = process.env.PORT ?? '3000'

app.all('/', (_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.use('/todo', todoController)
app.use('/user', userController)
app.use('/auth', authController)

;(async () => {
  try {
    await AppDataSource.initialize()
    console.log('db connected.')
    app.listen(PORT, function (): void {
      console.log('Server is running on port ' + PORT)
    })
  } catch (error) {
    console.log('db connection failed.', error)
    process.exit(1)
  }
})()
