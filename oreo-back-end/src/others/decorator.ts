import { createParamDecorator } from '@nestjs/common/decorators';

export interface RequestUserDTO {
    id: number;
    level: number;
}

export const RequestUser = createParamDecorator((data, req): RequestUserDTO => {
    return req.user;
});
