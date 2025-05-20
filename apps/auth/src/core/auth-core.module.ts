import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user';
import { UserService } from './service/user.service';
import { TokenManager } from './provider/token.manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshToken, RefreshTokenSchema } from './entity/refresh-token';
import { AuthAppServiceController } from './auth-app-service.controller';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '10m',
        },
        global: true,
      }),
    }),
  ],
  controllers: [
    AuthAppServiceController,
  ],
  providers: [
    AuthService,
    UserService,
    RoleService,
    TokenManager,
  ],
})
export class AuthCoreModule {}
