import { Module } from '@nestjs/common';
import { UserValidator } from '@/auth/auth-request.validator';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserValidator],
})
export class AuthModule {}
