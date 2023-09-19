import { Body, Controller, Param, Post, Query, Req } from '@nestjs/common';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { TokenService } from '../../core/services/auth/token.service';
import { User } from '../../core/repositories/dtos/auth.dto';
import { Request } from 'express';
import { AppLogger } from '../../common/logger';
import { ServerResponse } from '../../common/types/types';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly tokenService: TokenService,
    private readonly logger: AppLogger
  ) {}

  // todo: guards

  @Post('/signup')
  public async signUp(@Body() body: User): Promise<ServerResponse> {
    this.logger.log(`${this.signUp.name} was called in the controller.`);
    try {
      const tokens = await this.authenticationService.signUp(body);
      return {
        status: 200,
        message: 'Tokens was successfully obtained',
        data: tokens,
        error: null
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/signin')
  public async signIn(@Body() body: User): Promise<ServerResponse> {
    this.logger.log(`${this.signIn.name} was called in the controller.`);
    try {
      const tokens = await this.authenticationService.signIn(body);
      return {
        status: 200,
        message: 'Tokens was successfully obtained',
        data: tokens,
        error: null
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/refresh')
  public async updateTokens(@Param('id') id: string): Promise<ServerResponse> {
    this.logger.log(`${this.updateTokens.name} was called in the controller.`);
    try {
      const { email } = await this.authenticationService.findUser(id);

      const tokens = await this.tokenService.getTokens(id, email);
      await this.tokenService.updateRefreshToken(id, tokens.refresh_token);

      return {
        status: 200,
        message: 'Tokens was successfully obtained',
        data: tokens,
        error: null
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/logout')
  public async logout(@Req() req: Request): Promise<ServerResponse> {
    this.logger.log(`${this.logout.name} was called in the controller.`);
    try {
      await this.authenticationService.logout(req.user['sub']);
      return {
        status: 200,
        message: 'User was successfully logout',
        data: null,
        error: null
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 505,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }
}
