import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name!: string
  @Column()
  user_name!: string
  @Column()
  email!: string
  @Column()
  password!: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @DeleteDateColumn()
  deleted_at?: Date
}
