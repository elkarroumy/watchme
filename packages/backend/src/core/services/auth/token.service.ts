import { Injectable } from '@nestjs/common';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { encrypt } from '../../../helpers/crypto';
import { JwtService } from '@nestjs/jwt';
import { JWT, REDIS } from '../../../common/constants';
import RedisRepository from '../../../infrastructure/database/repositories/redis.repository';
import { Tokens } from '../../../common/types';
import { AppLogger } from '../../../helpers/logger';

@Injectable()
export class TokenService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly redisRepository: RedisRepository,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger
  ) {}

  public async updateRefreshToken(id: string, token: string): Promise<void> {
    this.logger.log(`${this.updateRefreshToken.name} was called in the service.`);
    const hashedRefreshToken = await encrypt(token);
    await this.authRepository.updateToken(id, hashedRefreshToken);
  }

  public async getTokens(id: string, email: string): Promise<Tokens> {
    this.logger.log(`${this.getTokens.name} was called in the service.`);
    const [access, refresh] = await Promise.all([
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

    await this.redisRepository.set(REDIS.ACCESS, JSON.stringify(access), REDIS.EXPIRE);
    await this.redisRepository.set(REDIS.REFRESH, JSON.stringify(refresh), REDIS.EXPIRE);

    const accessToken = await this.redisRepository.get(REDIS.ACCESS);
    const refreshToken = await this.redisRepository.get(REDIS.REFRESH);

    return {
      accessToken,
      refreshToken
    };
  }
}
