import { Request, Response, Router } from "express";
import fs from 'node:fs'
import { ITodo } from "../../interfaces/ITodo";
import { resolve } from "node:path";
import { sendSuccess } from "../../helper/sendSuccess";
import { validateDto } from "../../helper/validateDto";
import { createTodoDto } from "../../Dtos/todo/createTodoDto";

export const todo: Router = Router()

const dataPath = resolve(`${__dirname}/muck_todo.json`)


todo.get('/', (_req: Request, res: Response) => {
    const todos: ITodo[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    sendSuccess(res, todos)
})

todo.post('/', validateDto(createTodoDto), (req: Request<{}, {}, createTodoDto>, res: Response) => {
    const todos: ITodo[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const newTodo: ITodo = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description as string,
        user_id: req.body.user_id,
        status: 1,
        created_at: new Date()
    }
    const fileUrl = `${__dirname}/muck_todo.json`
    const newTodoData: ITodo[] = [...todos, newTodo]
    fs.writeFileSync(fileUrl, JSON.stringify(newTodoData), "utf-8")
    res.json(JSON.stringify(newTodoData))
})

todo.patch('/', (_req: Request, res: Response) => {
    res.end('post method called')
})

todo.delete('/', (_req: Request, res: Response) => {
    res.end('delete method called')
})
