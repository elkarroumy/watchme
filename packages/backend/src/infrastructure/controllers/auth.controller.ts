import { Body, Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { UserDto } from '../../core/entities/dtos/auth.dto';
import { Request } from 'express';
import { AppLogger } from '../../helpers/logger';
import { ServerResponse } from '../../common/types';
import { AccessTokenGuard } from '../../core/services/auth/guards/access-token.guard';
import { RefreshTokenGuard } from '../../core/services/auth/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly logger: AppLogger
  ) {}

  @Post('/signup')
  public async signUp(@Body() body: UserDto): Promise<ServerResponse> {
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
  public async signIn(@Body() body: UserDto): Promise<ServerResponse> {
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
  @UseGuards(RefreshTokenGuard)
  public async updateTokens(@Req() req: Request): Promise<ServerResponse> {
    this.logger.log(`${this.updateTokens.name} was called in the controller.`);
    try {
      const id = req.user['sub'];
      const refreshToken = req.user['refreshToken'];
      const tokens = await this.authenticationService.refreshTokens(id, refreshToken);
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
  @UseGuards(AccessTokenGuard)
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
