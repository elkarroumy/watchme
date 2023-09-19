import { Injectable } from '@nestjs/common';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { User } from '@prisma/client';
import { encrypt } from '../../../common/crypto';
import { JwtService } from '@nestjs/jwt';
import { JWT, REDIS } from '../../../common/constants';
import RedisRepository from '../../../infrastructure/database/repositories/redis.repository';

@Injectable()
export class TokenService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly redisRepository: RedisRepository,
    private readonly jwtService: JwtService
  ) {}

  public async updateRefreshToken(userId: string, token: string): Promise<void> {
    const hashedRefreshToken = encrypt(token);
    await this.authRepository.updateToken(userId, hashedRefreshToken);
  }

  public async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: JWT.ACCESS_SECRET,
          expiresIn: '15m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: JWT.REFRESH_SECRET,
          expiresIn: '7d'
        }
      )
    ]);

    const cachedAccess = await this.redisRepository.get(REDIS.ACCESS);
    const cachedRefresh = await this.redisRepository.get(REDIS.REFRESH);

    if (!cachedAccess && !cachedRefresh) {
      await this.redisRepository.set(REDIS.ACCESS, JSON.stringify(accessToken), REDIS.EXPIRE);
      await this.redisRepository.set(REDIS.REFRESH, JSON.stringify(refreshToken), REDIS.EXPIRE);
    }

    const [access_token, refresh_token] = [cachedAccess, cachedRefresh];

    return {
      access_token,
      refresh_token
    };
  }
}
