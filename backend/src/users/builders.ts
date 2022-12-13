import { UserInRequestToAuth, UserInRequestToBuild, UserToRegister } from '@/auth';
import { UserEntity } from '@/entities/user.entity';
import { hashPasswordToSha256 } from '@/utils/users.utils';
export function buildUser(content: UserToRegister): Partial<UserEntity> {
  return new UserEntity({
    email: content.email,
    password: hashPasswordToSha256(content.password),
    type: content.type,
    username: content.username,
    manager: content.manager ?? null,
    isActive: content.isActive ?? true,
  });
}
