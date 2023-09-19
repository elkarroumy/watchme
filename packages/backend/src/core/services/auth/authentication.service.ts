import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { decrypt, encrypt } from '../../../common/crypto';
import AuthRepository from '../../../infrastructure/database/repositories/auth.repository';
import { User } from '../../repositories/dtos/auth.dto';
import { EXCEPTION } from '../../../common/constants';
import { TokenService } from './token.service';

export class AuthenticationService {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService
  ) {}

  public async signUp(body: User) {
    const user = await this.findUser(body.email);
    if (user) {
      throw new BadRequestException(EXCEPTION.USER_ALREADY_EXISTS);
    }
    const hashedPassword = encrypt(body.password);

    const newUser = await this.authRepository.create({
      ...body,
      password: hashedPassword
    });

    const tokens = await this.tokenService.getTokens(newUser.id, newUser.email);
    await this.tokenService.updateRefreshToken(newUser.id, JSON.parse(tokens.refresh_token));
    return tokens;
  }

  public async findUser(email: string) {
    return await this.authRepository.find(email);
  }

  public async signIn({ email, password }: User) {
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

  public async logout(id: string) {
    await this.authRepository.updateToken(id, null);
  }
}
