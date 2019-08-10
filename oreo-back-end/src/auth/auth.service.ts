import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtService) private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async createToken(user: User): Promise<string> {
        return this.jwtService.sign({ id: user.id });
    }
}