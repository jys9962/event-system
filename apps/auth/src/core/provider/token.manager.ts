import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from '../auth-token';
import { User } from '../entity/user';
import { UserPayload } from '../../../../gateway/src/types/user.payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken, RefreshTokenDocument } from '../entity/refresh-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenManager {
  private readonly refreshTokenExpiresInMs: number;

  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.refreshTokenExpiresInMs = configService.getOrThrow<number>('REFRESH_TOKEN_EXPIRES_IN_MS');
  }

  async makeToken(user: User): Promise<AuthToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.issueAccessToken(user),
      this.issueRefreshToken(user),
    ]);

    return {
      accessToken, refreshToken,
    };
  }

  revokeToken(refreshToken: string) {
    return this.refreshTokenModel.updateOne({ token: refreshToken }, { revoked: true });
  }

  async getUserIdByRefreshToken(refreshToken: string): Promise<string | null> {
    const payload = await this.refreshTokenModel.findOne({
      token: refreshToken,
      revoked: false,
    });

    if (!payload?.isActive(new Date())) {
      return null;
    }

    return payload?.userId || null;
  }

  private async issueAccessToken(user: User): Promise<string> {
    const payload: UserPayload = {
      id: user.id,
      name: user.name,
      roles: user.roles,
    };

    return await this.jwtService.signAsync(payload);
  }

  private async issueRefreshToken(user: User): Promise<string> {
    const token = randomBytes(64).toString('hex');

    await this.refreshTokenModel.create({
      userId: user.id,
      token: token,
      expiresAt: new Date(Date.now() + this.refreshTokenExpiresInMs),
      revoked: false,
    });

    return token;
  }
}
