import { TodoEntity } from '../entities/todo.entity'
import { BaseRepository } from './base.repository'

export class TodoRepository extends BaseRepository<TodoEntity> {
  constructor() {
    super(TodoEntity)
  }
}
