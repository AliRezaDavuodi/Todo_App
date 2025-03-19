import { Request, Response, Router } from 'express'
import { CreateTodoDto } from '../../dtos/todo/createTodoDto'
import { UpdateTodoDto } from '../../dtos/todo/updateTodoDto'
import { FileRepository } from '../../helper/file.repository'
import { sendError } from '../../helper/sendError'
import { sendSuccess } from '../../helper/sendSuccess'
import { validateDto } from '../../helper/validateDto'
import { TodoService } from '../../service/todo.service'
import { TodoEntity } from '../../entities/todo.entity'

export const todo: Router = Router()
const todoService = new TodoService()

todo.get('/', async (_req: Request, res: Response) => {
  try {
    const todos: TodoEntity[] = await todoService.findAll()
    sendSuccess(res, todos)
  } catch (error) {
    console.log(error)
    sendError(res, 'failed to fetch todos', 500)
  }
})

todo.post('/', validateDto(CreateTodoDto), async (req: Request<{}, {}, CreateTodoDto>, res: Response) => {
  try {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 1,
    }

    const todo = await todoService.create(newTodo)

    sendSuccess(res, todo, 201)
  } catch (error) {
    console.log(error)
    sendError(res, 'Failed to create todo', 500)
  }
})

todo.patch(
  '/:id',
  validateDto(UpdateTodoDto),
  async (req: Request<{ id: string }, {}, UpdateTodoDto>, res: Response) => {
    try {
      const id = Number(req.params.id)
      const todo = await todoService.findById(id)

      if (!todo) {
        sendError(res, 'Todo did NOT Found.', 404)
        return
      }

      const updateTodo: UpdateTodoDto = {
        title: req.body?.title ?? todo.title,
        description: req.body?.description ?? todo.description,
        status: req.body.status ?? todo.status,
      }

      const updatedInfo = await todoService.update(id, updateTodo)

      sendSuccess(res, updatedInfo, 200)
    } catch (error) {
      console.log(error)
      sendError(res, 'update failed', 500)
    }
  },
)

todo.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (!id) {
      sendError(res, 'Please Put Todo id in the url.', 400)
      return
    }

    const todo = await todoService.findById(id)

    if (!todo) {
      sendError(res, 'Todo Not Found.', 404)
      return
    }

    const todoId = await todoService.delete(id)

    const deleteData = {
      delete: true,
      id: todoId,
    }

    sendSuccess(res, deleteData, 200)
  } catch (error) {
    sendError(res, 'failed to deleted Todo', 500)
  }
})
