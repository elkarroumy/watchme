import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { UserDto } from '../../core/auth/entities/dtos/auth.dto';
import { Request } from 'express';
import { ServerResponse } from '../../common/types';
import { JwtAccessGuard } from '../../common/guards/access-token.guard';
import { JwtRefreshGuard } from '../../common/guards/refresh-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
  unauthorizedSchema,
  forbiddenSchema
} from '../../common/documents/schemas';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signup')
  @ApiBody({ type: UserDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Register user' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async signUp(@Body() body: UserDto): Promise<ServerResponse> {
    const tokens = await this.authenticationService.signUp(body);
    return {
      status: HttpStatus.CREATED,
      message: 'Tokens was successfully obtained',
      data: tokens
    };
  }

  @Post('/signin')
  @ApiBody({ type: UserDto })
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'Login user' })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async signIn(@Body() body: UserDto): Promise<ServerResponse> {
    const tokens = await this.authenticationService.signIn(body);
    return {
      status: HttpStatus.OK,
      message: 'Tokens was successfully obtained',
      data: tokens
    };
  }

  @Get('/refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiUnauthorizedResponse(unauthorizedSchema)
  @ApiForbiddenResponse(forbiddenSchema)
  @ApiOperation({ summary: "Update user's tokens" })
  @ApiInternalServerErrorResponse(internalServerErrorSchema)
  public async updateTokens(@Req() req: Request): Promise<ServerResponse> {
    const id = req.user['email'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authenticationService.refreshTokens(id, refreshToken);
    return {
      status: HttpStatus.OK,
      message: 'Tokens was successfully obtained',
      data: tokens
    };
  }

  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiCreatedResponse(responseSchema)
  @ApiNotFoundResponse(notFoundSchema)
  @ApiOperation({ summary: 'User logout' })
  @ApiUnauthorizedResponse(unauthorizedSchema)
  public async logout(@Req() req: Request): Promise<ServerResponse> {
    await this.authenticationService.logout(req.user['sub']);
    return {
      status: HttpStatus.OK,
      message: 'User was successfully logout',
      data: null
    };
  }
}
