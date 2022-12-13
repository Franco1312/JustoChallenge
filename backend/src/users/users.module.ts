import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRegistrationValidator } from './user-register-request.validator';

@Module({
  imports: [AuthModule],
  providers: [UsersService, UserRegistrationValidator],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
