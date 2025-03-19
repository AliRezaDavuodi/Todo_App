import { DataSource } from 'typeorm'
import { config } from '../config/env'
import { TodoEntity } from '../entities/todo.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: config.DB_NAME,
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT as string),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [TodoEntity],
  // synchronize: config.NODE_ENV === 'development',
  synchronize: true,
})
