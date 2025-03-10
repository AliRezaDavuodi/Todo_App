import app from './app'
import { todo } from './controllers/todo/todo';

const PORT: string = process.env.PORT ?? '3000'

app.all('/', (_req, _res, next) => {
    console.log('Time: ', Date.now());
    next()
})

app.use('/todo', todo)


app.listen(PORT, function (): void {
    console.log("Server is running on port " + PORT);
});