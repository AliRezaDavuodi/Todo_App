import { AuthRepository } from '../repository/auth.repository'
import { RegisterDto } from '../dtos/auth/register.dto'
import bcrypt from 'bcrypt'
import { config } from '../config/env'
import { UserEntity } from '../entities/user.entity'

export class AuthService {
  constructor(protected readonly authRepo: AuthRepository = new AuthRepository()) {}

  public async login() {}

  public async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password, username } = registerDto
    const hashPassword = await bcrypt.hash(password,10)
    return this.authRepo.create({ name, email, username, password: hashPassword })
  }

  public async createToken() {}
  public async verifyToken() {}
}
