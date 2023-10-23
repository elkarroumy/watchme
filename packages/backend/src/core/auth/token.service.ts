import { Injectable } from '@nestjs/common';
import AuthRepository from '../../infrastructure/database/repositories/auth.repository';
import { encrypt } from '../../helpers/crypto';
import { JwtService } from '@nestjs/jwt';
import { JWT, REDIS } from '../../common/constants';
import RedisRepository from '../../infrastructure/database/repositories/redis.repository';
import { Tokens } from '../../common/types';

@Injectable()
export class TokenService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly redisRepository: RedisRepository,
    private readonly jwtService: JwtService
  ) {}

  public async updateRefreshToken(id: string, token: string): Promise<void> {
    const hashedRefreshToken = await encrypt(token);
    await this.authRepository.updateToken(id, hashedRefreshToken);
  }

  public async getTokens(id: string, email: string): Promise<Tokens> {
    const payload = {
      sub: id,
      email
    };
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT.ACCESS_SECRET,
        expiresIn: '15m'
      }),
      this.jwtService.signAsync(payload, {
        secret: JWT.REFRESH_SECRET,
        expiresIn: '7d'
      })
    ]);

    await this.redisRepository.set(REDIS.ACCESS, access, REDIS.EXPIRE);
    await this.redisRepository.set(REDIS.REFRESH, refresh, REDIS.EXPIRE);

    const accessToken = await this.redisRepository.get(REDIS.ACCESS);
    const refreshToken = await this.redisRepository.get(REDIS.REFRESH);

    return {
      accessToken,
      refreshToken
    };
  }
}
