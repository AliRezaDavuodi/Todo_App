import { Request, Response, Router } from "express";
import { createTodoDto } from "../../dtos/todo/createTodoDto";
import { UpdateTodoDto } from "../../dtos/todo/updateTodoDto";
import { FileRepository } from "../../helper/file.repository";
import { sendError } from "../../helper/sendError";
import { sendSuccess } from "../../helper/sendSuccess";
import { validateDto } from "../../helper/validateDto";
import { ITodo } from "../../interfaces/ITodo";

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
            description: req.body.description ?? "",
            user_id: req.body.user_id,
            status: 1,
            created_at: new Date()
        }
        const newTodoData: ITodo[] = [...todos, newTodo]
        await FileRepository.writeFile(newTodoData)
        sendSuccess(res, newTodo, 201)
    } catch (error) {
        console.log(error);
        sendError(res, 'Failed to create todo', 500)

    }
})

todo.patch('/:id', validateDto(UpdateTodoDto), async (req: Request<{ id: string }, {}, UpdateTodoDto>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const todos = await FileRepository.readFile()
        const todoIndex = todos.findIndex(todo => todo.id === id)

        if (todoIndex === -1) {
            sendError(res, "There is No Todo With This ID.", 404)
            return
        }

        const updatedTodo = {
            ...todos[todoIndex],
            title: req.body?.title ?? todos[todoIndex].title,
            description: req.body?.description ?? todos[todoIndex].description
        }

        todos.splice(todoIndex, 1, updatedTodo)

        await FileRepository.writeFile(todos)

        sendSuccess(res, todos[todoIndex], 200)

    } catch (error) {
        console.log(error);
        sendError(res, 'update failed', 500)
    }

})

todo.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const todos = await FileRepository.readFile()
        const id = Number(req.params.id)

        if (!id) {
            sendError(res, 'Please Put Todo id in the url.', 400)
            return
        }

        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            sendError(res, 'Todo NOT found.', 404)
            return
        }

        const updateTodos = todos.filter(todo => todo.id !== id)
        await FileRepository.writeFile(updateTodos)

        res.status(204).send()

    } catch (error) {
        sendError(res, 'failed to deleted Todo', 500)
    }
})
