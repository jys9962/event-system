import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthToken } from '../auth-token';
import { TokenManager } from '../provider/token.manager';
import { User } from '../entity/user';
import { RefreshAccessToken, SignIn, SignOut } from '@common/services/auth/auth-app.service.method';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly authTokenFactory: TokenManager,
  ) {}

  async signIn(
    { username, password }: SignIn.SignInRequest,
  ): Promise<SignIn.SignInResponse> {
    const user = await this.findLoginUser(username, password);
    if (!user) {
      throw Error();
    }

    return this.makeToken(user);
  }

  async refreshAccessToken(
    { refreshToken }: RefreshAccessToken.RefreshAccessTokenRequest,
  ): Promise<RefreshAccessToken.RefreshAccessTokenResponse> {
    const user = await this.findUserByToken(refreshToken);
    if (!user) {
      throw Error();
    }

    await this.authTokenFactory.revokeToken(refreshToken);
    return this.makeToken(user);
  }

  async signOut({ refreshToken }: SignOut.SignOutRequest): Promise<void> {
    await this.authTokenFactory.revokeToken(refreshToken);
  }

  private async makeToken(user: User): Promise<AuthToken> {
    return this.authTokenFactory.makeToken(user);
  }

  private async findLoginUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByName(email);
    if (!user) {
      return null;
    }

    if (!user.isActiveUser()) {
      return null;
    }

    const isSuccess = await user.signIn(password);
    if (!isSuccess) {
      return null;
    }

    return user;
  }

  private async findUserByToken(refreshToken: string): Promise<User | null> {
    const userId = await this.authTokenFactory.getUserIdByRefreshToken(refreshToken);
    if (!userId) {
      return null;
    }

    const user = await this.userService.findById(userId);
    if (!user || !user.isActiveUser()) {
      return null;
    }

    return user;
  }
}
