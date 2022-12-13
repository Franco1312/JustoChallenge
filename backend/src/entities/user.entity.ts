import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypes } from '@/entities/index';

@Entity('users')
export class UserEntity {
  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'fk_manager' })
  manager: UserEntity;

  @Expose({ name: 'username' })
  @Column({ type: 'varchar', length: 36 })
  username: string;

  @Column('enum', { nullable: false, enum: UserTypes })
  public type!: UserTypes;

  @Expose({ name: 'email' })
  @Column({ type: 'varchar', length: 36 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 265 })
  password: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
