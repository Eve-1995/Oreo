import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    /**
     * 这里的构造函数向父类传递了授权时必要的参数，在实例化时，父类会得知授权时，客户端的请求必须使用 Authorization 作为请求头，
     * 而这个请求头的内容前缀也必须为 Bearer，在解码授权令牌时，使用秘钥 secretOrKey: 'secretKey' 来将授权令牌解码为创建令牌时的 payload。
     */
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    /**
     * 在需要身份验证的控制器方法上+@UseGuards(AuthGuard()), 即会调用此函数进行身份验证, 并且如果身份证验证成功, 用户会被添加到req当中,通过ExecutionContext.switchToHttp().getRequest()即可拿到当前登陆的信息.因我暂时无这需求, 所以只保存token对应的用户id
     */
    async validate(payload: { id: number }) {
        return payload;
        // const user = await this.authService.validateUser(payload);
        // console.log(user);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;
    }
}