import { validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { UserToAuth, UserInRequestToAuth } from '@/auth/index';

export class UserValidator {
  public async validateUserInRequest(
    userInRequest: UserInRequestToAuth,
  ): Promise<UserToAuth> {
    try {
      const userDto = new UserToAuth(userInRequest);
      await validateOrReject(userDto, {
        validationError: { target: false, value: false },
      });
      return userDto;
    } catch (errors) {
      throw new BadRequestException({
        validationErrors: errors,
        statusCode: 400,
        message: 'Error while validating',
      });
    }
  }
}
