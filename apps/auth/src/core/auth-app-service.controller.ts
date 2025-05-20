import { Controller } from '@nestjs/common';
import { AuthAppService } from '@common/services/auth/auth-app.service';
import {
  AddRoles,
  RefreshAccessToken,
  RemoveRoles,
  SignIn,
  SignOut,
  UpdateRoles,
} from '@common/services/auth/auth-app.service.method';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './service/auth.service';
import { RoleService } from './service/role.service';

@Controller()
export class AuthAppServiceController implements AuthAppService {

  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @MessagePattern(SignIn.pattern)
  signIn(data: SignIn.SignInRequest): Promise<SignIn.SignInResponse> {
    return this.authService.signIn(data);
  }

  @MessagePattern(SignOut.pattern)
  signOut(data: SignOut.SignOutRequest): Promise<void> {
    return this.authService.signOut(data);
  }

  @MessagePattern(RefreshAccessToken.pattern)
  refreshAccessToken(data: RefreshAccessToken.RefreshAccessTokenRequest): Promise<RefreshAccessToken.RefreshAccessTokenResponse> {
    return this.authService.refreshAccessToken(data);
  }

  @MessagePattern(AddRoles.pattern)
  addRoles(data: AddRoles.Request): Promise<void> {
    return this.roleService.addRoles(data);
  }

  @MessagePattern(RemoveRoles.pattern)
  removeRoles(data: RemoveRoles.Request): Promise<void> {
    return this.roleService.removeRoles(data);
  }

  @MessagePattern(UpdateRoles.pattern)
  updateRoles(data: UpdateRoles.Request): Promise<void> {
    return this.roleService.updateRoles(data);
  }

}
