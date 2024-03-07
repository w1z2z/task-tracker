import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { LocalGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';
import { RegisterPayloadDto } from '../dto/register-payload.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в систему' })
  @ApiBody({ type: RegisterPayloadDto, description: 'Auth payload' })
  @ApiResponse({ type: String, description: 'Access token' })
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({ summary: 'Регистрация нового полтзователя' })
  @ApiBody({ type: RegisterPayloadDto, description: 'Register payload' })
  @ApiResponse({ type: RegisterResponseDto, description: 'Register response' })
  @Post('register')
  register(@Body() payload: RegisterPayloadDto): Promise<RegisterResponseDto> {
    return this.authService.register(payload);
  }
}
