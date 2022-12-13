import { validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { UserToRegister, UserInRequestToBuild } from '@/auth/index';

export class UserRegistrationValidator {
    public async validateUserInRequest(
        userInRequest: UserInRequestToBuild,
    ): Promise<UserToRegister> {
        try {
            const userDto = new UserToRegister(userInRequest);
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
