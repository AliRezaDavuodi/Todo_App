import { CreateTodoDto } from '../dtos/todo/createTodoDto'
import { UpdateTodoDto } from '../dtos/todo/updateTodoDto'
import { TodoEntity } from '../entities/todo.entity'
import { TodoRepository } from '../repository/todo.repository'

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository = new TodoRepository()) {}

  public async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll()
  }

  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(createTodoDto)
  }

  public async findById(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findById(id)
  }

  public async update(id: number, updateTodo: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodo)
  }

  public async delete(id: number) {
    return this.todoRepository.delete(id)
  }
}
