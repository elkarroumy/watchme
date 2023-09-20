import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { encrypt, decrypt } from '../../../helpers/crypto';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { UserDto } from '../../entities/dtos/auth.dto';
import { EXCEPTION } from '../../../common/constants';
import { TokenService } from './token.service';
import { Tokens } from '../../../common/types';
import { User } from '../../entities/user.entity';
import { AppLogger } from '../../../helpers/logger';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly logger: AppLogger
  ) {}

  public async signUp(body: UserDto): Promise<Tokens> {
    this.logger.log(`${this.signUp.name} was called in the service.`);
    const user = await this.findUser(body.email);
    if (user) {
      throw new BadRequestException(EXCEPTION.USER_ALREADY_EXISTS);
    }
    const hash = await encrypt(body.password);

    const createdUser = await this.authRepository.create({
      ...body,
      password: hash
    });

    const tokens = await this.tokenService.getTokens(createdUser.id, createdUser.email);
    await this.tokenService.updateRefreshToken(createdUser.id, JSON.parse(tokens.refreshToken));
    return tokens;
  }

  public async findUser(email: string): Promise<User> {
    this.logger.log(`${this.findUser.name} was called in the service.`);
    return await this.authRepository.find(email);
  }

  public async signIn({ email, password }: UserDto): Promise<Tokens> {
    this.logger.log(`${this.signIn.name} was called in the service.`);
    const user = await this.findUser(email);
    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    const verifyPassword = await decrypt(user.password, password);

    if (verifyPassword) {
      throw new BadRequestException(EXCEPTION.PASSWORD_INCORRECT);
    }
    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, JSON.parse(tokens.refreshToken));
    return tokens;
  }

  public async logout(id: string): Promise<void> {
    this.logger.log(`${this.logout.name} was called in the service.`);
    await this.authRepository.updateToken(id, null);
  }

  public async refreshTokens(email: string, refreshToken: string) {
    this.logger.log(`${this.refreshTokens.name} was called in the service.`);
    const user = await this.findUser(email);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(EXCEPTION.ACCESS_DENIED);
    }

    const refreshTokenMatches = decrypt(user.refreshToken, refreshToken);

    if (!refreshTokenMatches) {
      throw new ForbiddenException(EXCEPTION.ACCESS_DENIED);
    }

    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, JSON.parse(tokens.refreshToken));
    return tokens;
  }
}
