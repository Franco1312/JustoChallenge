import { UserTypes } from '@/entities';
import { UserEntity } from '@/entities/user.entity';

export const defaultUserBuilder = userBuilder();

export function userBuilder() {
  return (args?) =>
    new UserEntity({
      id: args?.fields.id ?? 1,
      uuid: args?.fields.uuid ?? 'random-uuid',
      manager: args?.fields.manager ?? null,
      type: args?.fields.type ?? UserTypes.HITMAN,
      username: args?.fields.username ?? 'someUsername',
      email: args?.fields.email ?? 'some@email.com',
      password: args?.fields.password ?? 'some-password',
      isActive: args?.fields.isActive ?? true,
    });
}
