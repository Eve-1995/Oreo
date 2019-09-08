
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';

// 判断请求用户是否为管理员
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return user.level === 1 ? true : false;
    }
}
