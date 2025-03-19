import { UserRepository } from '../repository/user.repository'
import { UserEntity } from '../entities/user.entity'

export class UserService {
  constructor(protected readonly userRepo: UserRepository = new UserRepository()) {}

  public async findAll(): Promise<UserEntity[] | []> {
    return this.userRepo.findAll()
  }

  public async findById(userId: number): Promise<UserEntity | null> {
    return this.userRepo.findById(userId)
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findByEmail(email)
  }
}
