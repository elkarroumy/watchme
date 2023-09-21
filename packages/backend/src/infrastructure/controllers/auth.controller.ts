import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { UserDto } from '../../core/entities/dtos/auth.dto';
import { Request } from 'express';
import { AppLogger } from '../../helpers/logger';
import { ServerResponse } from '../../common/types';
import { JwtAccessGuard } from '../../common/guards/access-token.guard';
import { JwtRefreshGuard } from '../../common/guards/refresh-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
  responseSchema,
  notFoundSchema,
  internalServerErrorSchema,
  unauthorizedSchema
} from '../../common/documents/schemas';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly logger: AppLogger
  ) {}

  @Post('/signup')
  @ApiBody({ type: UserDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Register user' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
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
        status: 500,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/signin')
  @ApiBody({ type: UserDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Login user' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
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
        status: 500,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Get('/refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiOperation({ summary: "Update user's tokens" })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async updateTokens(@Req() req: Request): Promise<ServerResponse> {
    this.logger.log(`${this.updateTokens.name} was called in the controller.`);
    try {
      const id = req.user['email'];
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
        status: 500,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }

  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'User logout' })
  @ApiUnauthorizedResponse(unauthorizedSchema)
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
        status: 500,
        message: 'Something went wrong, please, try again',
        data: null,
        error
      };
    }
  }
}
