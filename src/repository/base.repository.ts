import { ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../database/database'

export class BaseRepository<Entity extends ObjectLiteral> {
  protected repository: Repository<Entity>

  constructor(entityClass: new () => Entity) {
    this.repository = AppDataSource.getRepository(entityClass)
  }

  public async create(entityData: Entity): Promise<Entity> {
    const entity = this.repository.create(entityData)
    return this.repository.save(entity)
  }

  public async findAll(): Promise<Entity[]> {
    return this.repository.find()
  }

  public async findById(id: number): Promise<Entity | null> {
    return this.repository.findOneBy({ id } as any)
  }

  public async update(id: number, data: Partial<Entity>): Promise<Entity | null> {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  public async delete(id: number): Promise<number> {
    await this.repository.softDelete(id)
    return id
  }
}
