import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService
  ) { }

  // 创建token, token仅包含id与level信息
  async createToken(user: User): Promise<string> {
    return this.jwtService.sign({ id: user.id });
  }

  // 验证用户信息, 根据用户id查找该用户的数据
  async validateUser(payload: { id: number }): Promise<User> {
    return await this.userService.getUserById(payload.id);
  }
}
