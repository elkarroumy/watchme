import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { encrypt, decrypt } from '../../../helpers/crypto';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { UserDto } from '../../entities/dtos/auth.dto';
import { EXCEPTION } from '../../../common/constants';
import { TokenService } from './token.service';
import { Tokens } from '../../../common/types';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService
  ) {}

  public async signUp(body: UserDto): Promise<Tokens> {
    const user = await this.findUser(body.email);
    if (user) {
      throw new BadRequestException(EXCEPTION.USER_ALREADY_EXISTS);
    }
    const encrypted = encrypt(body.password);

    const newUser = await this.authRepository.create({
      ...body,
      password: encrypted
    });

    const tokens = await this.tokenService.getTokens(newUser.id, newUser.email);
    await this.tokenService.updateRefreshToken(newUser.id, JSON.parse(tokens.refresh_token));
    return tokens;
  }

  public async findUser(email: string): Promise<User> {
    return await this.authRepository.find(email);
  }

  public async signIn({ email, password }: UserDto): Promise<Tokens> {
    const user = await this.findUser(email);
    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    const verifyPassword = decrypt(user.password);

    if (verifyPassword !== password) {
      throw new BadRequestException(EXCEPTION.PASSWORD_INCORRECT);
    }
    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, JSON.parse(tokens.refresh_token));
    return tokens;
  }

  public async logout(id: string): Promise<void> {
    await this.authRepository.updateToken(id, null);
  }

  public async refreshTokens(id: string, refreshToken: string) {
    const user = await this.findUser(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(EXCEPTION.ACCESS_DENIED);
    }

    const refreshTokenMatches = decrypt(user.refreshToken);

    if (refreshToken !== refreshTokenMatches) {
      throw new ForbiddenException(EXCEPTION.ACCESS_DENIED);
    }

    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
