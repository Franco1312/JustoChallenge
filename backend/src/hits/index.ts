import { HitStatus } from '@/entities';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class Hit {
  constructor(hit: Partial<Hit>) {
    Object.assign(this, hit);
  }
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  assignee: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  targetName: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  hitCreator: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export interface HitInRequest {
  userId: number;
  assignee: string;
  description: string;
  targetName: string;
  status: HitStatus;
  hitCreator: string;
  isActive: boolean;
}
