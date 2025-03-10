import { Request, Response, Router } from "express";
import fs from 'node:fs'
import { ITodo } from "../../interfaces/ITodo";
import { resolve } from "node:path";
import { sendSuccess } from "../../helper/sendSuccess";
import { validateDto } from "../../helper/validateDto";
import { createTodoDto } from "../../Dtos/todo/createTodoDto";
import { FileRepository } from "../../helper/file.repository";
import { sendError } from "../../helper/sendError";
import { DeleteTodoDto } from "../../Dtos/todo/deleteTodoDto";

export const todo: Router = Router()


todo.get('/', async (_req: Request, res: Response) => {
    try {
        const todos: ITodo[] = await FileRepository.readFile()
        sendSuccess(res, todos)
    } catch (error) {
        console.log(error);
        sendError(res, 'failed to fetch todos', 500)
    }
})

todo.post('/', validateDto(createTodoDto), async (req: Request<{}, {}, createTodoDto>, res: Response) => {
    try {
        const todos: ITodo[] = await FileRepository.readFile()
        const newTodo: ITodo = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description as string,
            user_id: req.body.user_id,
            status: 1,
            created_at: new Date()
        }
        const newTodoData: ITodo[] = [...todos, newTodo]
        await FileRepository.writeFile(newTodoData)
        sendSuccess(res, 'Todo added successfully.', 201)
    } catch (error) {
        console.log(error);
        sendError(res, 'Failed to create todo', 500)

    }
})

todo.patch('/', (_req: Request, res: Response) => {
    res.end('post method called')
})

todo.delete('/', validateDto(DeleteTodoDto), async (req: Request<{}, {}, DeleteTodoDto>, res: Response) => {
    try {
        const todos = await FileRepository.readFile()
        const id = Number(req.body.id)

        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            sendError(res, 'Todo NOT found.', 404)
            return
        }

        const updateTodos = todos.filter(todo => todo.id !== id)
        await FileRepository.writeFile(updateTodos)

        sendSuccess(res, '', 204)

    } catch (error) {
        sendSuccess(res, 'failed to deleted Todo', 500)
    }
})
