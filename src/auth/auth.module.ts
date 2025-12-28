import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from 'src/auth/strategy/google.strategy';
import { User } from 'src/typeorm/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serializer } from './utils/serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, Serializer],
  exports: [AuthService],
})
export class AuthModule { }
