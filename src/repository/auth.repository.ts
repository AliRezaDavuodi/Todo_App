import { BaseRepository } from './base.repository'
import { UserEntity } from '../entities/user.entity'

export class AuthRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity)
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email })
  }
}
