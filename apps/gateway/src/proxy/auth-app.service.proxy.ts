import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthAppService } from '@common/services/auth/auth-app.service';
import { BaseProxy } from '@common/proxy/base.proxy';
import {
  AddRoles,
  RefreshAccessToken,
  RemoveRoles,
  SignIn,
  SignOut,
  UpdateRoles,
} from '@common/services/auth/auth-app.service.method';

@Injectable()
export class AuthAppServiceProxy extends BaseProxy implements AuthAppService {

  constructor(
    @Inject('AUTH_SERVICE')
    client: ClientProxy,
  ) {
    super(client);
  }

  signIn(data: SignIn.SignInRequest): Promise<SignIn.SignInResponse> {
    return this.send(SignIn.pattern, data);
  }

  refreshAccessToken(data: RefreshAccessToken.RefreshAccessTokenRequest): Promise<RefreshAccessToken.RefreshAccessTokenResponse> {
    return this.send(RefreshAccessToken.pattern, data);
  }

  signOut(data: SignOut.SignOutRequest): Promise<void> {
    return this.send(SignOut.pattern, data);
  }

  addRoles(data: AddRoles.Request): Promise<void> {
    return this.send(AddRoles.pattern, data);
  }

  removeRoles(data: RemoveRoles.Request): Promise<void> {
    return this.send(RemoveRoles.pattern, data);
  }

  updateRoles(data: UpdateRoles.Request): Promise<void> {
    return this.send(UpdateRoles.pattern, data);
  }

}
