import { Injectable } from '@nestjs/common';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { encrypt, decrypt } from '../../../helpers/crypto';
import { JwtService } from '@nestjs/jwt';
import { JWT, REDIS } from '../../../common/constants';
import RedisRepository from '../../../infrastructure/database/repositories/redis.repository';
import { Tokens } from '../../../common/types';

@Injectable()
export class TokenService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly redisRepository: RedisRepository,
    private readonly jwtService: JwtService
  ) {}

  public async updateRefreshToken(id: string, token: string): Promise<void> {
    const hashedRefreshToken = encrypt(token);
    await this.authRepository.updateToken(id, hashedRefreshToken);
  }

  public async getTokens(id: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email
        },
        {
          secret: JWT.ACCESS_SECRET,
          expiresIn: '15m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id,
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
