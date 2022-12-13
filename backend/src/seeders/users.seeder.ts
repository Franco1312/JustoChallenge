import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { defaultUserBuilder } from '@/seeders/utils/users.builder';
import { hashPasswordToSha256 } from '@/utils/users.utils';
import { UserTypes } from '@/entities';

const Users = [
  defaultUserBuilder({
    fields: {
      id: 1,
      type: UserTypes.BOSS,
      uuid: '1',
      username: 'Giuseppi',
      email: 'giuseppi@boss.com',
      password: 'boss-password',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 2,
      type: UserTypes.MANAGER,
      uuid: 'first-manager-random-uuid',
      email: 'first@manager.com',
      password: 'fist-manager-password',
      username: 'Lautaro',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 3,
      type: UserTypes.MANAGER,
      uuid: 'second-manager-random-uuid',
      email: 'second@manager.com',
      password: 'second-manager-password',
      username: 'Gimena',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 4,
      type: UserTypes.MANAGER,
      username: 'Francisco',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 5,
      uuid: 'first-hitman-uuid',
      email: 'first@hitman.com',
      password: 'first-hitman-password',
      manager: 2,
      username: 'Natalia',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 6,
      uuid: 'second-hitman-uuid',
      email: 'second@hitman.com',
      password: 'second-hitman-password',
      manager: 2,
      username: 'Sergio',
    },
  }),
  defaultUserBuilder({
    fields: {
      id: 7,
      uuid: 'third-hitman-uuid',
      email: 'third@hitman.com',
      password: 'third-hitman-password',
      manager: 3,
      username: 'Guadalupe',
    },
  }),
  defaultUserBuilder({ fields: { id: 8, username: 'Martin', manager: 6 } }),
  defaultUserBuilder({ fields: { id: 9, username: 'Candela', manager: 6 } }),
  defaultUserBuilder({ fields: { id: 10, username: 'Candelaria' } }),
  defaultUserBuilder({ fields: { id: 11, username: 'Juan' } }),
  defaultUserBuilder({ fields: { id: 12 } }),
  defaultUserBuilder({ fields: { id: 13 } }),
];

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<UserEntity[]> {
    return this.userRepository.save(
      Users.map((user) => {
        user.password = hashPasswordToSha256(user.password);
        return this.userRepository.create(user);
      }),
    );
  }

  async drop(): Promise<unknown> {
    return;
  }
}
