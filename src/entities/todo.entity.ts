import { Expose } from 'class-transformer'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('Todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  title!: string

  @Column({ type: 'smallint', default: 1 })
  status?: number

  @Column({ type: 'text', nullable: true })
  description?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
