import app from './app'
import { todoRoute } from './controllers/todo/todoRoute'
import { AppDataSource } from './database/database'
import { userRoute } from './controllers/user/user.controller'

const PORT: string = process.env.PORT ?? '3000'

app.all('/', (_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.use('/todo', todoRoute)
app.use('/user', userRoute)

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
