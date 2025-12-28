import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // api/auth/google/login
  @UseGuards(GoogleGuard)
  @Get('google/login')
  login() {
    return {msg: "google login endpoint"}
  }

  // api/auth/google/callback
  @UseGuards(GoogleGuard)
  @Get("google/callback")
  redirect() {
    return {msg: "google callback endpoint"}
  }

  @Get('status')
  userStatus(@Req() req: any) {
    console.log("user status:", req.user);
    return req.user;
  }


}
