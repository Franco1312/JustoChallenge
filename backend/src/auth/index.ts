import { UserTypes } from '@/entities';
import { UserEntity } from '@/entities/user.entity';
import { IsBoolean } from 'class-validator';
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export enum RoleTypes {
  ADMIN = 'admin',
}

export interface UserInRequestToBuild {
  email: string;
  password: string;
  manager?: UserEntity;
  type: UserTypes;
  username: string;
  isActive?: boolean;
}

export interface UserInRequestToAuth {
  email: string;
  password: string;
}

export class UserToAuth {
  constructor(user: Partial<UserToAuth>) {
    Object.assign(this, user);
  }
  @IsOptional()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserToRegister {
  constructor(user: Partial<UserToRegister>) {
    Object.assign(this, user);
  }

  @IsNotEmpty()
  @IsString()
  type: UserTypes;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string

  @IsOptional()
  manager : UserEntity

  @IsOptional()
  @IsBoolean()
  isActive : boolean
}
