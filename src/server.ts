import app from './app'
import { todo } from './controllers/todo/todo'
import { AppDataSource } from './database/database'

const PORT: string = process.env.PORT ?? '3000'

app.all('/', (_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
})

app.use('/todo', todo)

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
