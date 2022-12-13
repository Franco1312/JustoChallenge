import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@/entities/user.entity';
import { HitStatus } from '.';

@Entity('Hits')
export class HitEntity {
  constructor(hit: Partial<HitEntity>) {
    Object.assign(this, hit);
  }
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'fk_user' })
  userId: number;

  @Expose({ name: 'assignee' })
  @Column({ type: 'varchar', length: 36, nullable: true })
  assignee: string;

  @Expose({ name: 'description' })
  @Column({ type: 'varchar', length: 36, nullable: true })
  description: string;

  @Expose({ name: 'target_name' })
  @Column({ type: 'varchar', length: 36, nullable: true })
  target_name: string;

  @Expose({ name: 'status' })
  @Column('enum', { nullable: false, enum: HitStatus })
  public status!: HitStatus;

  @Expose({ name: 'hit_creator' })
  @Column({ type: 'varchar', length: 36, nullable: true })
  hit_creator: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: true,
  })
  isActive: boolean;
}
