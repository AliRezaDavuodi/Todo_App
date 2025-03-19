import { BaseRepository } from './base.repository'
import { UserEntity } from '../entities/user.entity'

export class UserRepository extends BaseRepository<UserEntity>{
  constructor() {
    super(UserEntity)
  }
}
